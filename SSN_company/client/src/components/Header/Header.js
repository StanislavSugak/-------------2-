import {IconProfile, IconSearchProfile, IconMore} from '../../utils/icon'
import { setBurgerOpen } from "../../store/slices/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import "./Header.scss";

const Header = () => {

    const dispatch = useDispatch(); 

    const isBurgerOpen = useSelector((state) => state.setting.isBurgerOpen); 

    const handleBurgerClick = () => {
        dispatch(setBurgerOpen(!isBurgerOpen)); 
    };

    return (
        <header>
            <div className="hello">
                <p className="text_mnt_f30_l30">SSN</p>
                <span className="line_name"></span>
                <p className="text_mln_f24_l24">Hi, person</p>
            </div>
            <div className="tool"> 
                <div className="icon">
                    <img src={IconProfile} alt="Person" />
                    <img src={IconSearchProfile} alt="Search" />
                    <img src={IconMore} alt="More" />
                </div>
                <button className='button_deadline' /*onClick={onClick}*/>
                    <p className="text_mln_f22_l22">Deadline</p>
                </button>
                <div className="burder_menu" onClick={handleBurgerClick}>
                    <span></span>
                    <span></span>
                    <span></span>   
                </div>
            </div>
        </header>
    );
};

export default Header;
