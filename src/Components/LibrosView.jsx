import {React, useState} from 'react';
import { cambiarLibroEstado, Libros } from '../Hooks/ConexionSW';
import swal from 'sweetalert';
import CrearLibro from './CrearLibro';
import EditarLibro from './EditarLibro'
import NavBar from './NavBar';

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


const LibrosView = () => {
    
    const [info, setInfo] = useState(undefined);
    const [estado1, setEstado1] = useState(false);
    const [estado2, setEstado2] = useState(false);
    const [libro, setLibro] = useState(undefined);

    const [llamada, setLlamada] = useState(false);
    const data = Libros().then((datos) =>
    {
        if(!llamada)
        {
            setInfo(datos);
            setLlamada(true);
        }
        
        
    }, (error) =>
    {
        mensaje(error.message);
    }); 

    return (
        <div>
            <NavBar/>
            <div className='container'>
                <div className='row'>
                    <div className='card mx-auto col-4 text-center mt-2'>
                        <div className='card-tittle alert alert-info mb-2 mt-3'>Libros</div>
                        <div className='row'>
                            <div className='col-4'></div>
                            <button className='btn btn-info col-4 mb-3' onClick={() => {setEstado1(!estado1)}}>Agregar Libro</button>
                        </div>
                        
                    </div>

                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>Numero</th><th>Autor</th><th>Titulo</th><th>Descripción</th><th>Editorial</th><th>Año</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (info && info.lista && info.lista.map((element, key) =>
                                {
                                    return( 
                                        <tr key={key}>
                                            <td>{(key)+1}</td>
                                            <td>{element.autores}</td>
                                            <td>{element.titulo}</td>
                                            <td>{element.descripcion}</td>
                                            <td>{element.editorial}</td>
                                            <td>{element.anio}</td>
                                            <td><button className='btn btn-warning' onClick={() => {setEstado2(!estado2); setLibro(info.lista[key].external)}}>Editar</button></td>
                                        </tr>
                                    )
                                    
                                }))
                            }
                        </tbody>
                    </table>
                </div>

                <CrearLibro estado={estado1} setEstado={setEstado1}/>
                <EditarLibro estado={estado2} setEstado={setEstado2} libro = {libro}/>
            </div>
        </div>
    );
};

export default LibrosView;