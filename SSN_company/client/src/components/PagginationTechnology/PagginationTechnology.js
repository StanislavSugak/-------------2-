import React, { useState } from 'react';
import "./PagginationTechnology.scss";
import { ItemTechnology } from '../../utils/components'

const PagginationTechnology = ({ stack }) => {
    const itemsPerPage = 4;
    const array = stack.array || [];

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
        <div className="t_technology">
            <div>
                <img src={stack.icon} alt="icon" />
                <p className="text_mln_f22_l22">{stack.text}</p>
            </div>
            <div>
                {array.length === 0 ? ( 
                    <p className="text_mln_f20_l20">Not studied...</p>
                ) : (
                    currentItems.map((data, index) => (
                        <ItemTechnology key={index} name={data.name} grade={data.grade}/>
                    ))
                )}
            </div>
            <div className="pagination">
                {renderDots()}
            </div>
        </div>
    );
}

export default PagginationTechnology;