import React from 'react';

export const Session = (token) => {
    //localStorage.setItem('token',token);
    sessionStorage.setItem('token',token);
};

export const getSession =() =>
{
   //return localStorage.getItem('token');
   return sessionStorage.getItem('token');
}

export const isLoged = () => {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if(token)
        return true;
    else 
        return false;
};

export const CerrarSession = () =>
{
    //localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}