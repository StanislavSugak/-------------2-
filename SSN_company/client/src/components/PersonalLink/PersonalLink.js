import React from 'react'
import "./PersonalLink.scss";

const PersonalLink = ({icon, link}) => {
    return(
        <div className="personal_link">
            <a href={link}>
                <img src={icon} alt="link" />
            </a>
        </div>
    )
}

export default PersonalLink