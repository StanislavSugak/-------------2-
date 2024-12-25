import React from 'react';
import './Select.scss'; // Импортируем стили
import { IconSelect } from '../../../utils/icon';

const Select = ({ isOpen, onToggle, options, onSelect, selectedOption, placeholder }) => {
    return (
        <div className="select">
            <div className="select-header" onClick={onToggle}>
                <img src={IconSelect} alt="selector icon" />
                <span className="placeholder">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.length > 0 ? (
                        options.map(option => (
                            <div key={option.value} onClick={() => onSelect(option)}>
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="no-options">Выберите значение из первого селектора</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;