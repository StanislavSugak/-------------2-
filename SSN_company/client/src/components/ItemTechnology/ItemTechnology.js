import React, { useState } from "react";
import "./ItemTechnology.scss";

const ItemTechnology = ({ name, grade }) => {
    return (
        <div className="t_icon">
            <span></span>
            <p className="text_mln_f20_l20">{name}</p>
            <p className="text_mln_f20_l20">{grade}</p>
        </div>
    );
};

export default ItemTechnology;
