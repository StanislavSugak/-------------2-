import React, { useEffect } from 'react';
import './Nobody.scss'; // Импортируем стили

const Nobody = ({text}) => {
    return (
       <p className="nobody">{text}</p>
    );
};

export default Nobody;   