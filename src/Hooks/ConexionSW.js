import axios from 'axios';
import React from 'react';
import { useEffect, useState} from 'react';
import { getSession, Session } from '../Utilidades/Utilidades';

const URL= 'http://localhost:3000/api/v1'


export const Opac = (accion = true) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>
    {
        if(accion) callApi();
    });

    const callApi = async () =>
    {   
        try 
        {
            const {data} = await axios.get(URL + '/opac');
            setInfo(data);
        } 
        catch (error) {
            //console.log(error);
            setError(error);
        }
        
    }
    return {info, error, execute: callApi};
};

export const IngresarSistema = async (data) =>
{
    return await axios.post(URL + "/autenticar", data)
    .then((response)=>
    {
        if(response.data && response.data.token)
        {
            const session = Session(response.data.token);
        }
        return response.data;
    });
}

export const CerrarSistema = async (data) =>
{
    await CerrarSistema();
    return true;
}

export const Libros = async (token) =>
{
    const config = {headers:{
        'access-token' : getSession()
    }};
    return await axios.get(URL + "/libro/listar", config)
    .then((response)=>
    {
        return response.data;
    });
}

export const guardarLibro = async(data) =>
{
    const config = {headers:{
        'access-token' : getSession()
    }};
    return await axios.post(URL + "/libro/guardar",data, config).then((response)=>
    {
         console.log(response);
         return response.data;
    });
}

export const editarLibro = async(externalID, data) =>
{
    const config = {headers:{
        'access-token' : getSession()
    }};

    console.log("awdawd   ",data);
    return await axios.post(URL + "/libro/editar",data,config,externalID)
    .then((response)=>
    {
        return response.data;
    });
}

export const obtenerLibro = async(externalID) =>
{
    const config = {headers:{
        'access-token' : getSession()
    }};
    return await axios.get(URL + "/libro/obtener/"+externalID, config)
    .then((response)=>
    {
        return response.data;
    });
}

export const cambiarLibroEstado = async(externalID) =>
{
    const config = {headers:{
        'access-token' : getSession()
    }};
    console.log(externalID);
    return await axios.get(URL + "/libro/cambio/"+externalID, config)
    .then((response)=>
    {
        console.log(response);
        return response.data;
    });
}


