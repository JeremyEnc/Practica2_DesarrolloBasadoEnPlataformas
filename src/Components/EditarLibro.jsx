import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import '../Css/Bootstrap.css';
import {editarLibro, obtenerLibro } from '../Hooks/ConexionSW';
import swal from 'sweetalert';

const EditarLibro = ({estado, setEstado, libro}) => {
    

    const { register, handleSubmit, setValue } = useForm({ shouldUseNativeValidation: true });
    
    const mensaje = (texto, state, title) => swal
    (
        {
            tittle: title,
            text: texto,
            icon: state,
            timer: 2000
        }
    );

    const onSubmit = async data => 
    { 
        var datos = {'anio': data.anio, 'titulo': data.titulo, 'autores': data.autores, 'descripcion': data.descripcion, 'edicion': data.edicion, 'editorial': data.editorial, 'codigo':data.codigo, 'external':data.external};

        setEstado(false);
        const editLibro = editarLibro(libro, datos).then((info)=>
        {
            if(info)
            {
                mensaje(info.msg, "success", "Exito").then(()=>{window.location.reload(true);});
            }
            else
            {
                mensaje(info.msg,"error","Error");
            }
        });
    };

    const recuperarLibro = obtenerLibro(libro).then((info) =>
    {
        if(info.data)
        {
            setValue('anio', info.data.anio);
            setValue('titulo', info.data.titulo);
            setValue('autores', info.data.autores);
            setValue('descripcion', info.data.descripcion);
            setValue('edicion', info.data.edicion);
            setValue('editorial', info.data.editorial);
            setValue('codigo', info.data.codigo);
            setValue('external', info.data.external);
        }
    });

    return (
        <>
            {estado &&
                <Overlay>
                    <ContenedorModal>
                        <div className='container-fluid'>
                            <div className='row mt-3'>
                                <label htmlFor="" className='col-12 text-center form-label'>EDITAR LIBRO</label>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text"{...register('codigo')} hidden={true} name="" id="" />
                                <input type="text"{...register('external')} hidden={true} name="" id="" />
                                <div className='row mt-2'>
                                    <div className='col-1'></div>
                                    <label htmlFor="" className='col-5 form-label'>Año de Publicacion</label>
                                    <input className='col-5 form-control' {...register("anio")} type='number' />
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
                                    <button type='submit' className='btn btn-success ml-3'>Guardar</button>
                                </div>
                            </form>

                        </div>
                    </ContenedorModal>
                </Overlay>
            }
        </>
    );
};

export default EditarLibro;

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