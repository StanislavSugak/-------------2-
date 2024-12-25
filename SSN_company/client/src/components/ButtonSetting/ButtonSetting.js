import React from "react";
import "./ButtonSetting.scss";

const ButtonSetting = ({text, index, isActive, onClick}) => {
    const customClass = index % 2 === 1 ? 'ch' : 'nch';
    const activeClass = isActive ? 'active' : '';
    
    return (
        <button className={`button_setting ${customClass} ${activeClass}`}  onClick={onClick}>
            <p className="text_mln_f18_l18">{text}</p>
        </button>
    );
};

export default ButtonSetting;
