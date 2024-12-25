import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "./ButtonCreate.scss";

const ButtonCreate = ({text, onNext}) => {
    return (
        <button className="button_next" onClick={onNext}>
            <p className="text_mln_f16_l16">{text}</p>
        </button>
    );
};

export default ButtonCreate;