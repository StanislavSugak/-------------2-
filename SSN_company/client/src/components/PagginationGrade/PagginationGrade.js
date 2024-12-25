import React, { useState } from "react";
import "./PagginationGrade.scss";
import { useDispatch, useSelector } from "react-redux";
import {ItemGrade, CreateCardMini} from '../../utils/components'

const PagginationGrade = ({language}) => {

    const pageOther = useSelector((state) => state.setting.pageOther); 

    const itemsPerPage = 4;
    const array = language || [];

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

    return (
        <div className="grade_con">
            <div className="grade">
                {array.length === 0 ?  ( 
                    <p className="text_mln_f20_l20">Not studied...</p>
                ) : (
                    currentItems.map((language, index) => (
                        <ItemGrade key={index} name={language.name} grade={language.grade} isMentor={language.is_mentor}/>
                    ))
                )}
            </div>
            <div className="pagination">
                {renderDots()}
            </div>
            {pageOther && <CreateCardMini text={"Add language"}/>}      
        </div>

    );
};

export default PagginationGrade;
