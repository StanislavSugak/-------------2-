import React, { useEffect } from 'react';
import './BlockEmployee.scss'; // Импортируем стили
import { BlockText } from '../../../utils/components';

const BlockEmployee = ({name, surname, direction, image}) => {
    return (
        <div className="block_employee">
            <span className="be_image"></span>
            <BlockText up={`${name} ${surname}`} low={direction} />
        </div>
    );
};

export default BlockEmployee;   