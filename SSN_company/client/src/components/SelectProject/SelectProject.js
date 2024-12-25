import React, { useState } from 'react';

import './SelectProject.scss'; // Импортируем стили
import { IconHide } from '../../utils/icon';

const SelectProject = ({ options, placeholder, onSelect, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleSelect = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Закрываем селектор при выборе
        if (onSelect) {
            onSelect(option); // Передаем выбранный вариант обратно
        }
    };

    return (
        <div className="custom-select">
            <div className="select-header" onClick={toggleSelect}>
                <img src={IconHide} alt="selector icon" />
                <span className="placeholder">
                    {selectedOption ? selectedOption.label : (placeholder || 'Name project')}
                </span>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option) => (
                        <div 
                            key={option.key} 
                            className="select-option" 
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectProject;