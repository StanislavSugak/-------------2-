import React from 'react'
import "./PersonalInfo.scss";

const PersonalInfo = ({parameter, value}) => {
    return(
        <div className="personal_info">
            <p className="text_mln_f16_l16">{parameter}</p>
            <p className="text_mln_f20_l20">{value}</p>
        </div>
    )
}

export default PersonalInfo