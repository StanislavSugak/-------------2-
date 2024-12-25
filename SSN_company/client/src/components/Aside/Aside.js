import { employeeRoutes, teamleadRoutes, basicRoutes } from '../../routes';
import { setBurgerOpen, setPageOther } from "../../store/slices/settingSlice";
import { restoreOldProjects } from "../../store/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { IconBack } from '../../utils/icon';
import './Aside.scss'

const Aside = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const role = useSelector((state) => state.auth.user.role);
    const routes = role === "teamlead" ? [ ...employeeRoutes, ...teamleadRoutes,] : [...employeeRoutes];

    const isBurgerOpen = useSelector((state) => state.setting.isBurgerOpen)
    const pageOther = useSelector((state) => state.setting.pageOther); 

    const changePath = () => {
        setTimeout(() => {
            dispatch(setPageOther(false));
            dispatch(restoreOldProjects());
            navigate(-1);
        }, 100); 
    };

    useEffect(() => {
        const handleResize = () => {
            const isWideScreen = window.innerWidth > 1025;

            if (isWideScreen) {
                if (!isBurgerOpen) {
                    dispatch(setBurgerOpen(true)); 
                }
            }
        };

        handleResize(); 

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, [isBurgerOpen, dispatch]);

    useEffect(() => {
        // Заменяем старое состояние на новое
        window.history.pushState(null, document.title, window.location.href);
    
        const handlePopState = (event) => {
            changePath(); // Теперь просто вызываем changePath
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [dispatch, navigate]);

    return(
        <aside className={`${isBurgerOpen ? 'open' : 'closed'}`}>
            <ul>
                {routes.map(({ path, name, icon }) => (
                        <li key={path}>
                            <img src={icon} alt={name}/>
                            <NavLink to={path}>{name}</NavLink>
                        </li>

                ))}
                {pageOther && (
                    <>
                        <div className="aside_null"></div>
                        <div className="aside_back">
                            <img src={IconBack} alt="back" />
                            <button onClick={changePath} className="back-button">
                                <p>back</p>
                            </button>
                        </div>
                        
                    </>
                   
                )}
            </ul>
            <ul>
                {basicRoutes.map(({ path, name, icon }) => (
                    <li key={path}>
                        <img src={icon} alt={name}/>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Aside;