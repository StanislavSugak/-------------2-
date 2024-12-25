import {AppRouter, Loading, Header, Main, Footer, Modal } from './utils/components'
import { checkAuth } from "./store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './styles/_body.scss'
import { setPageOther } from './store/slices/settingSlice';

const App = () => {
    const dispatch = useDispatch();

    const [isInitialized, setIsInitialized] = useState(false);

    const isModalOpen = useSelector((state) => state.modal.isOpen);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });

            const savedPageOther = localStorage.getItem('pageOther');
            if (savedPageOther) {
                dispatch(setPageOther(JSON.parse(savedPageOther)));
            }
        } else {
            setIsInitialized(true);
        }
    }, [dispatch]);
    
    return (
        <BrowserRouter>
            <Header />
            <Main>
                {isInitialized ? ( <AppRouter /> ) : ( <Loading /> )}
            </Main>
            <Footer />
            <Modal/>
        </BrowserRouter>
    );
};

export default App;