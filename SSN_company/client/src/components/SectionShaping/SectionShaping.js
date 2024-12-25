import { IconHide, IconQuestion } from "../../utils/icon";
import React from "react";
import './SectionShaping.scss';

const SectionShaping = ({ headerText, children, isVisible, toggleVisibility }) => {
    return (
        <div className="section_shaping">
            <div className="section_text">
                <p className="text_mln_f30_l36">{headerText.h1}</p>
                <p className="text_mln_f20_l20">{headerText.h2}</p>
                <div className="section_tool">
                    <img src={IconQuestion} alt="quest" />
                    <img src={IconHide} alt="hide" onClick={toggleVisibility} />
                </div>
            </div>
            <div className={`container ${isVisible ? '' : 'collapsed'}`}>
                {/* <div className="container_test"></div> */}
                {children}
            </div>
        </div>
    );
};

export default SectionShaping;