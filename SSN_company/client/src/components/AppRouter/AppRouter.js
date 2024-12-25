import { teamleadRoutes, employeeRoutes, commonRoutes, basicRoutes } from "../../routes";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {Authorization, Project, Workspace} from "../../utils/components";
import { useSelector, useDispatch } from "react-redux";
import React , {useEffect} from "react";
import { setPageOther } from "../../store/slices/settingSlice";

const AppRouter = () => {
    const auth = useSelector((state) => state.auth.isAuth);
    const role = useSelector((state) => state.auth.user.role);
    
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // Проверяем, есть ли параметры в пути
        const hasParams = /\/\w+\/\w+/.test(location.pathname); // Пример проверки на наличие параметров

        if (!hasParams) {
            dispatch(setPageOther(false));
        }
    }, [location.pathname, dispatch]);


    return (
        <>
            <Routes>
                {auth ? (
                    <>
                        {role === 'teamlead' && (
                            <>
                                {teamleadRoutes.map(({ path, Component }) => (
                                    <Route key={path} path={path} element={<Component />} />
                                ))}
                                <Route path="/projects/:employeeId/:employeeRole" element={<Project />} />
                                <Route path="/workspace/:employeeId" element={<Workspace />} />
                            </>
                        )}
                        {employeeRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {commonRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {basicRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}

                        <Route path="*" element={<Navigate to="/project" />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Authorization />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default AppRouter;
