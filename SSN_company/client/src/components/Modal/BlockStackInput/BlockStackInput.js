import React from 'react';
import './BlockStackInput.scss';
import { BlockText } from '../../../utils/components';
import { IconDeleteBag } from '../../../utils/icon';

const BlockStackInput = ({ direction, stack, people, onRemove, onPeopleChange }) => {
    return (
        <div className="block_stack_input">
            <BlockText up={direction} low={stack} />
            <input 
                type="number" 
                value={people} 
                onChange={onPeopleChange} 
                placeholder="Количество людей" 
            />
            <img src={IconDeleteBag} alt="Удалить" onClick={onRemove} /> {/* Добавляем обработчик удаления */}
        </div>
    );
};

export default BlockStackInput;