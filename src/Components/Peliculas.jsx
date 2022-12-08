import React, {useRef } from 'react';
import '../Css/Bootstrap.css'
import Test from '../Hooks/Test';

export const Peliculas = () => 
{
    const {info, execute} = Test(undefined, false);
    
    //const info = null;
    const valor = useRef(null);


    const handleClick = () =>
    {
        execute(valor.current.value);
        
    }

    if (info) {
        return (
            <div className='row align-items-start'>
                <div className='row col-12' style={{ padding: "20px" }}>
                    <label className='label label-danger col-3'>Ingrese nombre:</label>
                    <input ref={valor} type="text" className='form-control col-4' name="" id="" />
                    <button className='btn btn-danger col-1' onClick={handleClick}>Buscar</button>
                </div>

                {info.Search.map((element, key) => {
                    return <div className="col-3" key={key} style={{ margin: "20px" }}>
                        <img src={element.Poster} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className='card-tittle'>{element.Title}</h5>
                            <p className="card-text">{element.Year}</p>
                            <button className='btn btn-primary'>Mis clicks</button>
                        </div>
                    </div>
                })}
            </div>
        );
    }
    else
    {
        return(
            <div className='row col-12' style={{padding: "20px"}}>
                <label className='label label-danger col-3'>Ingrese nombre:</label>
                <input ref={valor} type="text" className='form-control col-4' name="" id="" />
                <button className='btn btn-danger col-1' onClick={handleClick}>Buscar</button>
            </div>
        )
    }
}