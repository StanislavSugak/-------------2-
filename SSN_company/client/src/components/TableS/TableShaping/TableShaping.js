import { BlockStack, BlockText, Paggination, Person } from "../../../utils/components";
import { ButtonCreate, NoneLine, Select } from '../../../utils/components';
import React, { useEffect, useState } from "react";
import './TableShaping.scss';
import { IconAddPerson, IconAddStack, IconDeletePerson, IconDeleteStack } from "../../../utils/icon";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setHeaderText, setModalContent } from "../../../store/slices/modalSlice";
import { addStack, removeStack, removeUser } from "../../../store/slices/projectSlice";
import { getTechnology } from "../../../store/slices/technologySlice";

const TableShaping = ({ stacks, users, id_project, main_user }) => {
    const dispatch = useDispatch();

    const userCountByMainStack = users.reduce((acc, user) => {
        const mainStackId = user.main_stack_id;
        if (mainStackId) {
            acc[mainStackId] = (acc[mainStackId] || 0) + 1;
        }
        return acc;
    }, {});
    
    const handleDeleteStack = (id_stack) => {
        dispatch(removeStack({id_project, id_stack}));
    };

    const handleDeleteUser = (id_user, id_stack) => {
        dispatch(removeUser({id_project, id_user, id_stack}));
    };

    const openDeleteStackModal = () => {
        const modalContent = (
            <>
                <Paggination>
                    {stacks.map((stack, index) => (
                            <span key={index} onClick={() => {
                                handleDeleteStack(stack.stack_id);
                                dispatch(openModal());
                            }}> 
                                <BlockText up={stack.direction_name} low={stack.stack_name} />
                            </span>
                    ))}
                </Paggination>    
            </>
        );
        dispatch(setHeaderText('Delete stack'));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };

    const openDeleteUserModal = () => {
        const modalContent = (
            <>
                <Paggination>
                    {console.log(users)}
                    {users.map((user, index) => {
                        
                        const userStack = main_user.find(mainUser => mainUser.user_id === user.user_id);
                        const stackId = userStack ? userStack.stack_id : null;

                        return (
                            <span key={index} onClick={() => {
                                if (stackId) {
                                    handleDeleteUser(user.user_id, stackId);
                                }
                                dispatch(openModal());
                            }}> 
                                <BlockText up={`${user.user_name} ${user.user_surname}`} low={'click to delete'} />
                            </span>
                        );
                    })}
                </Paggination>     
            </>
        );
        dispatch(setHeaderText('Delete user'));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };

    const hOpenModal = (text, modalContent) => {
        dispatch(setHeaderText(text));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };
    const stack = useSelector((state) => state.technology.stack);
    const allStacks = stack.flatMap(item => item.stacks);
    
    useEffect(() => {
        dispatch(getTechnology());
    }, [dispatch]);

    const handleCreateStack = () => {
        const modalContent = <StackSelector allStacks={allStacks} id_project={id_project} />;
        hOpenModal('Add', modalContent);
    };

    const tool = [
        {
            icon: IconAddPerson,
            onClick: '', // Добавьте соответствующую функцию
        },
        {
            icon: IconDeletePerson,
            onClick: openDeleteUserModal, // Открытие модального окна для удаления пользователей
        },
        {
            icon: IconAddStack,
            onClick: handleCreateStack, // Добавьте соответствующую функцию
        },
        {
            icon: IconDeleteStack,
            onClick: openDeleteStackModal, // Открытие модального окна для удаления стеков
        },
    ];




    return (
        <div className="table_shaping fade_in">
            <div className="ts_stack">
                <div className="ts_tool">
                    {tool.map((tool, index) => (
                        <img src={tool.icon} alt="icon" key={index} onClick={tool.onClick}/>
                    ))}
                </div>

                {stacks.length > 0 ? ( 
                    <>
                        <div className="ts_bc"></div>
                        {stacks.map((stack, index) => (
                            <BlockStack 
                                key={index} 
                                direction={stack.direction_name} 
                                stack={stack.stack_name} 
                                required_count={stack.required_count} 
                                count={userCountByMainStack[stack.stack_id] || 0} 
                            />
                        ))}
                    </>
                ) : (
                    <div className="no_stacks_message">
                        <p className="text_mln_f18_l18">No stack</p>
                    </div> 
                )}
            </div>
            <div className="ts_person">
                {users.length != 0 ? (            
                    users.map((user, index) => (
                        <Person 
                            key={index} 
                            user={user}
                            stacks={stacks}
                        />
                    ))
                ) : (
                    <div className="no_stacks_message_person">
                        <p className="text_mln_f18_l18">No person</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableShaping;


const StackSelector = ({ allStacks, id_project }) => {
    const dispatch = useDispatch();
    const [selectedStack, setSelectedStack] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(''); // Состояние для инпута
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleSelect = (option) => {
        setSelectedStack(option);
        setIsOpen(false);
    };

    const options = allStacks.map(stackItem => ({
        value: stackItem.stack_id,
        label: stackItem.stack_name
    }));
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        
        // Проверка, что введено числовое значение
        if (value === '' || /^[1-5]$/.test(value)) {
            setInputValue(value);
        } else {
            alert('Value must be between 1 and 5');
        }
    };
    return (
        <>
            <Select
                isOpen={isOpen}
                onToggle={handleToggle}
                options={options}
                onSelect={handleSelect}
                selectedOption={selectedStack}
                placeholder="Select a stack"
            />
            <input 
                type="number" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Enter a number (1-5)" 
                min="1" 
                max="5"
            />
            <NoneLine />
            <ButtonCreate 
                text={"Add"} 
                onNext={() => {
                    if(selectedStack && inputValue){
                        dispatch(addStack({ id_project: id_project, id_stack: selectedStack.value, count_required: Number(inputValue) })); 
                        window.location.reload();
                    }
                }} 
            />
        </>
    );
};