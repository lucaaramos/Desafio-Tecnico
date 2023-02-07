import {BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './components/home';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}/>
      
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
