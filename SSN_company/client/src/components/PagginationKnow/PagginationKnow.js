import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PagginationKnow.scss";
import { ButtonCreate, CreateCard, ItemLearn, NoneLine, Select } from '../../utils/components';
import { createWish, getTechnology } from "../../store/slices/technologySlice";
import { openModal, setHeaderText, setModalContent } from "../../store/slices/modalSlice";

const PagginationKnow = ({ learn }) => {
    const dispatch = useDispatch();
    const pageOther = useSelector((state) => state.setting.pageOther);
    const stack = useSelector((state) => state.technology.stack);
    
    const itemsPerPage = 4;
    const array = learn || [];

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = array.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(array.length / itemsPerPage);

    const renderDots = () => {
        if (totalPages < 2) return null; 

        return Array.from({ length: totalPages }, (_, index) => (
            <span 
                key={index} 
                className={`dot ${currentPage === index + 1 ? 'active' : ''}`} 
                onClick={() => setCurrentPage(index + 1)}
            ></span>
        ));
    };

    const hOpenModal = (text, modalContent) => {
        dispatch(setHeaderText(text));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };

    const allStacks = stack.flatMap(item => item.stacks);
    
    useEffect(() => {
        dispatch(getTechnology());
    }, [dispatch]);
    
    const handleCreate = () => {
        const modalContent = <StackSelector allStacks={allStacks} />;
        hOpenModal('Create wish', modalContent);
    };

    return (
        <div className="w_know fade_in">
            <div className="k_text">
                <p className="text_mln_f30_l30">I want to develop in</p>
                <p className="text_mln_f18_l18">my wish list</p>
                <div className="pagination">
                    {renderDots()}
                </div>
            </div>
            <div className="k_card">
                {array.length === 0 && pageOther ? ( 
                    <p className="text_mln_f20_l20 not_learn">Not learn...</p>
                ) : (
                    currentItems.map((study, index) => (
                        <ItemLearn key={index} index={index} study={study}/>
                    ))
                )}
                {!pageOther && <CreateCard text="Create wish" type={"wish"} onClick={handleCreate}/>}
            </div>
        </div>
    );
};

const StackSelector = ({ allStacks }) => {
    const dispatch = useDispatch();
    const [selectedStack, setSelectedStack] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useSelector((state) => state.auth.user);

    const handleToggle = () => setIsOpen(prev => !prev);
    const handleSelect = (option) => {
        setSelectedStack(option);
        setIsOpen(false);
    };

    const options = allStacks.map(stackItem => ({
        value: stackItem.stack_id,
        label: stackItem.stack_name
    }));

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
            <NoneLine />
            <ButtonCreate 
                text={"Add"} 
                onNext={() => {
                    if(selectedStack){
                        dispatch(createWish({ id_user: id, id_stack: selectedStack.value })); 
                        window.location.reload();
                    }
                }} 
            />
        </>
    );
};

export default PagginationKnow;