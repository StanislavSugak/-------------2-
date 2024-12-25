import "./HeaderProject.scss";
import React from "react";
import {HeaderPageLine} from '../../utils/components'

const HeaderProject = ({ contentSearch, headerText, statusPorject, info, onFilterChange }) => {
    return (
        <div className="header_project">
            <div className="header_project_main">
                {contentSearch}
                <div className="header_project_filter">
                    <p className="text_mln_f20_l20">{headerText.h1}</p>
                    <p className="text_mln_f52_l52">{headerText.h2}</p>
                    <div className="filter_container">
                        <div>
                            <p className="text_mln_f20_l20">Filter by </p>
                        </div>
                        {statusPorject.map((status, index) => {
                            return (
                                <button key={index} className="filter_button" onClick={() => onFilterChange(status.value)}>
                                    <img src={status.image} alt="fail" />
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="header_info">
                    {info.map((item, index) => {
                        return (
                            <div key={index} className="header_info_container">
                                <p className="text_mln_f20_l20">{item.name}</p>
                                <p className="text_mln_f26_l26">{item.count}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <HeaderPageLine />
        </div>
    );
};

export default HeaderProject;
