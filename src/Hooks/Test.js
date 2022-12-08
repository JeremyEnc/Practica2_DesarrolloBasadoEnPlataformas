
import axios from 'axios';
import { useEffect, useState} from 'react';

export const Test = (nombre, accion= true) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>
    {
        if(accion) callApi(nombre);
    });

    const callApi = async (nombre) =>
    {   
        try 
        {
            const {data} = await axios.get('https://www.omdbapi.com/?apikey=9698175f&s='+nombre);
            setInfo(data);
        } 
        catch (error) {
            //console.log(error);
            setError(error);
        }
        
    }
    return {info, error, execute: callApi};
};

export default Test;