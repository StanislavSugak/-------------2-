import React, {useState} from "react";
import "./ButtonSort.scss";

const ButtonSort = ({ text, isActive, onClick }) => {
    const clickSort = (e) => {
        e.preventDefault(); 
        onClick(); 
    };

    return (
        <div className="button_sort">
            <button className={`radio_button ${isActive ? 'active' : ''}`} onClick={clickSort}>
                <div className={`active ${isActive ? 'show' : 'hide'}`}></div>
            </button>
            <p className="text_mln_f22_l22_custom">{text}</p>
        </div>
    );
};

export default ButtonSort;
