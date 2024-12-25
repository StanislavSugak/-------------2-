import React, { useState } from "react";
import "./ItemGrade.scss";

const ItemGrade = ({ name, grade, isMentor}) => {
    const levelColors = {
        1: "#BC7C7C", // Красный
        2: "#E4C087", // Желтый
        3: "#F6EFBD", // Светло-желтый
        4: "#5BD186", // Зеленый
        5: "#A2D2DF", // Голубой
    };
    
    const levelColor = levelColors[grade] || "#FFF"; 
    const levelWidth = `${grade * 40}px`;

    return (
        <div className="l_grade">
            { isMentor && <p className="isMentor">Mentor</p> }
            <div>
                <div className="l_level">
                    <span style={{ backgroundColor: levelColor, width: levelWidth }}></span>
                </div>
                <p className="text_mln_f20_l20">{name}</p>
            </div>
            <p className="text_mln_f20_l20">{grade}</p>
        </div>
    );
};

export default ItemGrade;
