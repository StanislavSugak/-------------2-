import React from "react";
import './Person.scss';

const Person = ({ user, stacks }) => {
    const gradeColors = {
        1: '#BC7C7C', // level_1
        2: '#E4C087', // level_2
        3: '#F6EFBD', // level_3
        4: '#5BD186', // level_4
        5: '#A2D2DF'  // level_5
    };

    const getColorForGrade = (grade) => {
        return gradeColors[grade] || null; // Возвращает цвет или null, если оценки нет
    };

    const hexToRgba = (hex, alpha) => {
        // Убираем символ '#' и преобразуем в массив чисел
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255; // Извлекаем красный компонент
        const g = (bigint >> 8) & 255;  // Извлекаем зеленый компонент
        const b = bigint & 255;         // Извлекаем синий компонент
    
        return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Возвращаем строку в формате rgba
    };

    return (
        <div className="person">
            <div className="p_name">
                <p className="text_mln_f18_l18">{user.user_name} {user.user_surname}</p>
            </div>
            <div className="p_grade">
                {stacks.map((stack, index) => {
                    const userStack = user.stacks.find(s => s.id_stack === stack.stack_id);
                    const displayGrade = userStack ? userStack.grade : null;
                    const mentor = userStack ? userStack.is_mentor : null;

                    // Определяем, является ли стек основным
                    const isMainStack = user.main_stack_id === stack.stack_id;

                    return (
                        <div
                            key={index}
                            style={{
                                backgroundColor: displayGrade ? (isMainStack ? getColorForGrade(displayGrade) : hexToRgba(getColorForGrade(displayGrade), 0.45)) : 'transparent',
                            }}
                        >
                            {displayGrade !== null && (
                                <>
                                    <p className="text_mln_f18_l18">{displayGrade}</p>
                                    {mentor && <p className="text_mln_f14_l14">M</p>}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Person;