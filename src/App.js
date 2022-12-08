//import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
//import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrincipalView from './Components/PrincipalView';
import { useEffect, useState} from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isLoged } from './Utilidades/Utilidades';
import LibrosView from './Components/LibrosView';
 
function App() {
  
  const MiddleWare = ({children})=>
  {
    const autenticado = isLoged();
    const location = useLocation();
    if (autenticado)
    {
      return children;
    }
    else
    {
      return <Navigate to = '/' state ={location}/>
    }
  }

  const MiddleWareSession = ({children})=>
  {
    const autenticado = isLoged();
    const location = useLocation();
    if (autenticado)
    {
      return <Navigate to = '/principal'/>
    }
    return children;
  }

  return(
    <div> 
      <Routes>
        <Route path = '/' element = {<MiddleWareSession><Login/></MiddleWareSession>} exact/>
        <Route path = '/principal' element = {<MiddleWare><PrincipalView/></MiddleWare>}/>
        <Route path = '/libros' element = {<MiddleWare><LibrosView/></MiddleWare>}/>
      </Routes>
    </div>
  );
}

export default App;
