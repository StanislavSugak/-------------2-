import Aside from '../../components/Aside/Aside';
import { useLocation } from "react-router-dom";
import React from "react";
import './Main.scss';

const Main = ({ children }) => {
    const location = useLocation(); // Получаем текущий путь
    const isLoginPage = location.pathname === '/login'; 

    return (
        <main>
            <div className={isLoginPage ? 'children full-width' : 'children'}>
                {children}
            </div>
            {location.pathname !== '/login' && <Aside />}
        </main>
    );
}

export default Main;