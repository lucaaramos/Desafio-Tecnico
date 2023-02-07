from flask import Flask,jsonify, request
import mysql.connector
from mysql.connector import Error
from uuid import uuid4 as uuid
from flask_cors import CORS
from flask_restful import Api


app = Flask(__name__)

CORS(app,resources={r'/*' : {'origins': '*'} })

@app.route('/', methods=['GET'])
def index1():
    try:    
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        cursor =  conexion.cursor()
        cursor.execute('select producto.id,producto.nombre,producto.precio,producto.idTipoProducto, tipoproducto.descripcion as tipo from producto, tipoproducto  where producto.idTipoProducto=tipoproducto.id')
        rows =  cursor.fetchall()
        productos = [] 
        for f in rows:
            productos.append({
            "id":f[0],
            "TipoProducto":f[4],
            "idTipoProducto":f[3],
            "nombre": f[1],
            "precio":f[2]
        })         
        cursor.close()
        return  jsonify(productos)
    except Exception as e:
        return {'status':'400', 'message': str(e)}
   
@app.route('/tipoProducto', methods=['GET'])

def getTipo():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
     
        cursor=  conexion.cursor()
        cursor.execute('select * from tipoproducto')
        rows =  cursor.fetchall()    
        productos = [] 
        for k in rows:
            productos.append({
            "id":k[0],
            "descripcion": k[1]
        })         
        conexion.close()
        return  jsonify(productos)
    except Exception as e:
        return {'status':'400', 'message': str(e)}

@app.route('/producto', methods=['POST'])
def index():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        cursor = conexion.cursor()
        sql = 'insert into producto(idTipoProducto,nombre,precio) values(%s,%s,%s)'
        datos = request.get_json()
        nombre = datos['nombre']    
        precio = datos['precio']
        tipo = datos['idTipoProducto']
        datos=[tipo,nombre,precio]
        cursor.execute(sql,datos)
        conexion.commit()
        cursor.close()
        return  jsonify({'Mensaje':'Bienvenido'})
    except Exception as e:        
        return {'status':'400', 'message': str(e)}   

@app.route('/delete', methods=['DELETE'])
def delete():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        datos = request.get_json()
        datos = datos['id']
        cursor = conexion.cursor()
        delete_query = "DELETE FROM producto WHERE " + 'id' + " = " + str(datos)
        cursor.execute(delete_query)
        conexion.commit()
        cursor.close()
        return 'Borrado exitosamente'
    except Exception as e:
        return {'status':'400', 'message': str(e)}


@app.route('/put', methods=['PUT'])
def updateProducto():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        datos = request.get_json()
        nombre = datos['nombre']
        precio = datos["precio"]
        tipoProducto = datos["idTipoProducto"]
        id = datos["id"]
        cursor = conexion.cursor()
        if(nombre or precio or tipoProducto):
            update_product = "UPDATE producto SET nombre =' "+ nombre +"', precio =' "+ str(precio) +"', idTipoProducto =' "+ str(tipoProducto) +"'  WHERE id = "+ str(id)
        else:
            return 'Tipo producto inexistente'
        cursor.execute(update_product)
        conexion.commit()
        cursor.close()        
        return  jsonify({'Mensaje':'Bienvenido'})
    except Exception as e:
        return {'status':'400', 'message': str(e)}
            
@app.route('/stock', methods=['POST'])
def getStock():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        datos = request.get_json()
        id = datos["idProducto"]
        cursor= conexion.cursor()
        cursor.execute('select * from stock where idProducto = ' + str(id))
        rows = cursor.fetchall()
        productos = [] 
        for f in rows:
            productos.append({
            "idProducto":f[1],
            "cantidad": f[2]
            }) 
        cursor.close()
        return  productos
    except Exception as e:
        return {'status':'400', 'message': str(e)}


@app.route('/stockPost', methods=['POST'])
def stock():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        cursor = conexion.cursor()
        sql = 'insert into stock(idProducto,cantidad) values(%s,%s)'
        datos = request.get_json()
        idProducto = datos['idProducto'] 
        cantidad = datos['cantidad']    
        datos=[idProducto,cantidad]
        cursor.execute(sql,datos)
        conexion.commit()
        cursor.close()
        return  jsonify({'Mensaje':'Bienvenido'})
    except Exception as e:
        return {'status':'400', 'message': str(e)}

@app.route('/putStock', methods=['PUT'])
def putStock():
    try:
        conexion = mysql.connector.connect( user='root',
                                   password='181299',
                                   host='localhost',
                                   database='test',
                                   port='3306')
        datos = request.get_json()
        id = datos["id"]
        cantidad = datos['cantidad']
        cursor = conexion.cursor()
        if(cantidad):
            update_stock = "UPDATE stock SET cantidad='"+cantidad+"'  WHERE id = "+ str(id)
        else:
            return 'Tipo producto inexistente'
        cursor.execute(update_stock)
        conexion.commit()
        cursor.close()
        return 'actualizado exitosamente'
    except Exception as e:
        return {'status':'400', 'message': str(e)}

    
if __name__=="__main__":
    app.run(debug=True)