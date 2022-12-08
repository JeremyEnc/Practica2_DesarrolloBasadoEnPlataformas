import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Bootstrap.css';
import { CerrarSession } from '../Utilidades/Utilidades';
import NavBar from './NavBar';


const PrincipalView = () => {
    const navegacion = useNavigate();
    const logout = () =>
    {
        CerrarSession();
        navegacion('/');
    }
    return (
        <div>
            <NavBar></NavBar>
            <div>
                <div>
                    <img  src="https://media.istockphoto.com/id/1286354786/es/vector/fondo-abstracto-texturizado-de-prisma-oscuro.jpg?s=612x612&w=0&k=20&c=IyqbnM7kqc1FmfTMJf2phHXcx-n5zx4zJnA1xqJdmZc=" className="img-fluid " alt="" />
                </div>
                <div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem accusamus temporibus neque pariatur magnam maxime nemo et incidunt consequatur cupiditate suscipit hic nobis dolorum provident necessitatibus explicabo, molestias minima modi.</p>
                </div>
                <label onClick={logout}>SAlir</label>
                
            </div>
        </div>
    );
};

export default PrincipalView;