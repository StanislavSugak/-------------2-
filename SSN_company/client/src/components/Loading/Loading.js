import { useLocation } from "react-router-dom";
import React from "react";
import './Loading.scss';

const Loading = () => {
    const location = useLocation();
    
    const loadingClass = location.pathname === '/login' ? 'loading' : 'loading_other';
    return (
        <div className={loadingClass}>
            <div className="dot-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <p className="text_mln_f32_l32">Loading</p>
        </div>
    );
}

export default Loading;