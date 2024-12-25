import './ButtonSectionCard.scss';
import React from "react";

const ButtonSectionCard = ({ image, active, onClick, customClass = 'img20' }) => {
   return(
        <div className={`button_card ${active ? 'active' : ''}`} onClick={onClick}>
            <img src={image} alt="f" className={`${customClass}`} />
        </div>
   )
}

export default ButtonSectionCard;