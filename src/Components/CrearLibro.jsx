import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import '../Css/Bootstrap.css';
import { cambiarLibroEstado, guardarLibro, Libros } from '../Hooks/ConexionSW';
import swal from 'sweetalert';

const CrearLibro = ({estado, setEstado}) => {
    
    const mensaje = (texto, state, title) => swal
    (
        {
            tittle: title,
            text: texto,
            icon: state,
            timer: 2000
        }
    );


    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const onSubmit = async data => 
    { 
        var datos = {'anio': data.anio, 'titulo': data.titulo, 'autores': data.autores, 'descripcion': data.descripcion, 'edicion': data.edicion, 'editorial': data.editorial, 'codigo':null, 'external':null};
        
        setEstado(false);
        const agregarLibro = guardarLibro(datos).then((info)=>
        {
            if(info)
            {
                mensaje(info.msg, "success", "Exito").then(()=>
                {
                    window.location.reload(true);
                });
                    
                Libros().then((datos) =>
                {
                    cambiarLibroEstado(datos.lista[(datos.lista.length)-1].external);
                });
            }
            else
            {
                mensaje(info.msg,"error","Error");
            }
        });
    };

    return (
        <>
            {estado &&
                <Overlay>
                    <ContenedorModal>
                        <div className='container-fluid'>
                            <div className='row mt-3'>
                                <label htmlFor="" className='col-12 text-center form-label'>AGREGAR LIBRO</label>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row mt-2'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Año de Publicacion</label>
                                    <input className='col-5 form-control' {...register("anio")} type='number'/>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Titulo</label>
                                    <input className='col-5 form-control' {...register('titulo')} type="text"/>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Autor</label>
                                    <input className='col-5 form-control' {...register('autores')} type="text"/>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Descripcion</label>
                                    <input className='col-5 form-control' {...register('descripcion')} type="text"/>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Edicion</label>
                                    <input className='col-5 form-control' {...register('edicion')} type="text"/>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Editorial</label>
                                    <input className='col-5 form-control' {...register('editorial')} type="text" />
                                    <div className='col-1'></div>
                                </div>
                            
                                <div className='text-center my-4'>
                                    <button className='btn btn-danger' onClick={() => {setEstado(false)}}>Cancelar</button>
                                    <button type='submit' className='btn btn-success ml-3'>Agregar</button>
                                </div>
                            </form>

                        </div>
                    </ContenedorModal>
                </Overlay>
            }
        </>
    );
};

export default CrearLibro;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(0,0,0,.5);

    display: flex;
    align-items: center;
    justify-content: center;
    
    `;

const ContenedorModal = styled.div`
    width: 500px;
    min-height  100px;
    position: relative;     
    background: #fff;
    border-radius: 5px;
    pading: 20px;
    `;