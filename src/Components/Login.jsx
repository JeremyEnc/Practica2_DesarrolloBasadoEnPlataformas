import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../Css/Bootstrap.css';
import { IncioSesion, IngresarSistema } from '../Hooks/ConexionSW';
import swal from 'sweetalert';
import { BrowserRouter as router, useNavigate } from 'react-router-dom';


const Login = ({setToken}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const mensaje = (texto) => swal
    (
        {
            tittle: "Error",
            text: texto,
            icon: "error",
            button: "Aceptar",
            timer: 2000
        }
    );

    const onSubmit = (data) => 
    { 
      var datos = {'usuario': data.correo, 'clave': data.clave};
      const login = IngresarSistema(datos).then((info) =>
      {
        if(info && info.token)
        {
            navigate('/principal');
        }
        else
        {
            mensaje(info.msg);
        }
      });
    };
    
    return (
        <div className='row'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" {...register('correo', {required:true, pattern:/\S+@\S+\.\S+/})}className="form-control" id="exampleInputEmail1" arnombreia-describedby="emailHelp"/>
                    {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger fade show' role='alert' >Mal correo</div>}  
                    {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger fade show' role='alert' >Ingrese el corre un valido</div>}
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" {...register('clave')}className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;