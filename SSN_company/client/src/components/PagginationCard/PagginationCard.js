import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PagginationCard.scss";
import { ProjectCard, CreateCard, EmployeeCard, EmptyCard, Input, NoneLine, ButtonCreate, Select} from "../../utils/components";
import { setCurrentPage } from "../../store/slices/settingSlice";
import { closeModal, openModal, setHeaderText, setModalContent } from "../../store/slices/modalSlice";
import { createProjects } from "../../store/slices/projectSlice";
import { getTechnology } from "../../store/slices/technologySlice";
import { registrationUser } from "../../store/slices/userSlice";

const PagginationCard = ({ arrayCards, cardType }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.setting.currentPage);
    const currentFilter = useSelector((state) => state.project.currentFilter);
    const pageOther = useSelector((state) => state.setting.pageOther); 
    const createTask = useSelector((state) => state.form.createTask);
    const { id } = useSelector((state) => state.auth.user);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = arrayCards.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(arrayCards.length / itemsPerPage);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(getTechnology());
    }, [dispatch])

    useEffect(() => {
        if (isSubmitting) {
            const projectData = {id_teamlead: id, ...createTask}            
            dispatch(createProjects({projectData})); 
            setIsSubmitting(false);
        }
    }, [isSubmitting, createTask, dispatch]);

    const renderDots = () => {
        if (totalPages < 2) return null;

        return Array.from({ length: totalPages }, (_, index) => (
            <span key={index} className={`dot ${currentPage === index + 1 ? 'active' : ''}`} 
            onClick={() => {
                dispatch(setCurrentPage(index + 1));
            }}></span>
        ));
    };

    const createText = () => {
        return currentFilter === 'notStarted' || cardType === 'employee';
    };

    const [textInCreate, setCreateText] = useState('create');
    const [textInNone, setNoneText] = useState('none');

    useEffect(() => {
        setCreateText(currentFilter === 'notStarted' ? 'create task' : 'create employee');
        if (arrayCards.length === 0) {
            setNoneText(currentFilter !== '' ? 'No task...' : 'No employee...');
        }
    }, [currentFilter, arrayCards.length]); 

    const hOpenModal = (text, modalContent) => {
        dispatch(setHeaderText(text));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };

    const direction = useSelector((state) => state.technology.direction);

    const handleCreateClick = () => {

        const modalContent = (
            <>
                <StackSelector allStacks={direction} />
            </>
        );
        hOpenModal(`Create ${currentFilter === 'notStarted' ? 'task' : 'employee'}`, modalContent);
    };

    return (
        <div className="container_cards">
            <div className="cards">
                {arrayCards.length === 0 ? ( 
                    <EmptyCard text={textInNone} />
                ) : (
                    currentItems.map((data, index) => (
                        cardType === "employee" ? (
                            <EmployeeCard key={index} user={data} index={index} />
                        ) : (
                            <ProjectCard key={index} project={data} status={currentFilter} currentPage={currentPage} />
                        )
                    ))
                )}
                {!pageOther && createText() && <CreateCard text={textInCreate} onClick={handleCreateClick} />}
            </div>
            <div className={`pagination ${totalPages < 2 ? 'hidden' : ''}`}>
                {renderDots()}
            </div>
        </div>
    );
};

export default PagginationCard;

const StackSelector = ({ allStacks }) => {
    const dispatch = useDispatch();
    const [selectedStack, setSelectedStack] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleToggle = () => setIsOpen(prev => !prev);
    const handleSelect = (option) => {
        setSelectedStack(option);
        setIsOpen(false);
    };

    const options = allStacks.map(stackItem => ({
        value: stackItem.id,
        label: stackItem.direction
    }));
    
    return (
        <>
                <Input 
                    text={"Email..."} 
                    type="text" 
                    dispatchAction={(value) => setEmail(value)} 
                />
                <Input 
                    text={"Password..."} 
                    type="text" 
                    dispatchAction={(value) => setPassword(value)} 
                />
                <Input 
                    text={"Name..."} 
                    type="text" 
                    dispatchAction={(value) => setName(value)} 
                />
                <Input 
                    text={"Surname..."} 
                    type="text" 
                    dispatchAction={(value) => setSurname(value)} 
                />
            <Select
                isOpen={isOpen}
                onToggle={handleToggle}
                options={options}
                onSelect={handleSelect}
                selectedOption={selectedStack}
                placeholder="Select a stack"
            />
            <NoneLine />
            <ButtonCreate 
                text={"Create"} 
                onNext={() => {
                    if(selectedStack && email && password && name && surname){
                        dispatch(registrationUser({email, password, role: 'employee', id_direction: selectedStack.value, name, surname})); 
                        alert('Пользователь успешно зарегистрирован!');
                        dispatch(closeModal());
                    }
                }} 
            />
        </>
    );
};