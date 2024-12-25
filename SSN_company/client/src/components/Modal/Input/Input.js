import React from 'react';
import './Input.scss'; // Импортируем стили
import { useDispatch } from 'react-redux';
import { setName, setDescription, setDate } from '../../../store/slices/formSlice'; // Импортируем действия

const Input = ({ text, type, dispatchAction  }) => {

    const handleChange = (e) => {
        // Проверяем, является ли тип input "file"
        if (type === 'file') {
            const file = e.target.files[0]; // Получаем файл
            dispatchAction(file); // Вызываем переданную функцию dispatch с файлом
        } else {
            const value = e.target.value;
            dispatchAction(value); // Вызываем для других типов
        }
    };
    const minDate = type === 'date' ? new Date().toISOString().split('T')[0] : null;

    return (
        <form className="input">
            <input
                type={type}
                placeholder={text}
                onChange={handleChange}
                min={minDate} 
            />
        </form>
    );
};

export default Input;