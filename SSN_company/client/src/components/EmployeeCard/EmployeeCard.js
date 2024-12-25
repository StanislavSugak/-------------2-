import React, {useEffect, useState} from "react";
import "./EmployeeCard.scss";
import {IconAnaliticEmployee, IconTaskEmployee, IconGmail, IconVk, IconTelegram, IconHireDateEmployee} from '../../utils/icon'
import {ButtonSectionCard} from '../../utils/components'
import { STATIC_URL } from "../../http";
import {setPageOther} from "../../store/slices/settingSlice";
import {saveOldProjects} from "../../store/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

    const EmployeeCard = ({user, index}) => {
        const dispatch = useDispatch();

        const employeeLinks = [
            { image: IconTaskEmployee, url:`/projects/${user.id}/${user.role}` }, 
            { image: IconAnaliticEmployee, url: '/analytic' } 
        ];
    
        const link = [
            { icon: IconTelegram, url: '' },
            { icon: IconGmail, url: '' },
            { icon: IconVk, url: '' }
        ];

        const otherPage = () => {
            dispatch(saveOldProjects()); 
            dispatch(setPageOther(true));
        }

        return (
            <div className="employee_card fade_in">
                <div className="hire_date">
                    <img src={IconHireDateEmployee} alt="f" className="icon_hire_date"/>
                    <p className="text_mln_f14_l14">{user.date_hire}</p>
                </div>
                <img src={`${STATIC_URL}/${user.image}`} alt ="image" className="employee_image"></img>
                <p className="text_mln_f24_l24">{user.name} {user.surname}</p>
                <p className="text_mln_f18_l18">{user.direction}</p>
                <div className="employee_button">
                    <Link to={`/workspace/${user.id}`} className={`button_profile ${index % 2 === 1 ? "nch" : "ch"}`} onClick={otherPage}>
                        <p className="text_mln_f18_l18">Profile</p>
                    </Link>
                    {employeeLinks.map((link, index) => (
                        <Link to={link.url} key={index}>
                            <ButtonSectionCard image={link.image} active={false} onClick={otherPage} customClass="img18" />
                        </Link>
                    ))}
                </div>
                <div className="button_link">
                    {link.map((link, index) => (
                        <a key={index} href={link.url}>
                            <img src={link.icon} alt="icon" className="link_icon"/>
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    export default EmployeeCard;
