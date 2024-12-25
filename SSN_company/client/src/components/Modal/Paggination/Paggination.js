import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Paggination.scss'
import { Line, NoneLine } from '../../../utils/components';

const Pagination = ({ children }) => {
    const itemsPerPage = 3;
    const array = React.Children.toArray(children); // Преобразуем дочерние элементы в массив

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
        <>
            {array.length === 0 ? (
                    <p className="text_mln_f20_l20">Not studied...</p>
            ) : (
                <div className="pag_item">
                    {currentItems.map((item, index) => (
                        <div key={index}>{item}</div> 
                    ))  }  
                </div>
            )}
            <Line />
            <div className="pagination">
                {renderDots()}
            </div>
        </>
    );  
};

export default Pagination;