import { ImageLastProject, ImageNowProject, ImageFutureProject } from '../../utils/images';
import { IconProjectMain, IconProjectSetting, IconProjectHome } from '../../utils/icon';
import { ButtonSectionCard, BlockText, BlockEmployee, Paggination, NoneLine, Nobody, Input, SelectDS } from '../../utils/components';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { openModal, setHeaderText, setModalContent } from '../../store/slices/modalSlice';
import "./ProjectCard.scss";

const icons = [IconProjectMain, IconProjectSetting, IconProjectHome];

const ProjectCard = ({ project, status }) => {
    const dispatch = useDispatch();

    const role = useSelector((state) => state.auth.user.role);
    const currentPage = useSelector((state) => state.setting.currentPage);
    const currentFilter = useSelector((state) => state.project.currentFilter);

    const [section, setSection] = useState(0);

    const handleClick = (index) => {
        setSection(index);
    };

    useEffect(() => {
        setSection(0);
    }, [currentPage, currentFilter]);

    const modalTechnology = (
        !project.stacks || project.stacks.length === 0 ? (
            <Nobody text={"no technology..."} />
        ) : (
            <Paggination>
                {project.stacks.map((technology, index) => (
                    <BlockText key={index} up={technology.direction_name} low={technology.stack_name} />
                ))}
            </Paggination>
        )
    );

    const modalTeam = (
        !project.users || project.users.length === 0 ? (
            <Nobody text={"no employee..."} />
        ) : (
            <>
                <BlockEmployee name={project.project_teamlead_name} surname={project.project_teamlead_surname} direction={"teamlead"} />
                <NoneLine />
                <Paggination>
                    {project.users.map((user, index) => (
                        <BlockEmployee key={index} name={user.user_name} surname={user.user_surname} direction={user.user_direction} />
                    ))}
                </Paggination>
                <SelectDS />
            </>
        )
    );

 

    const hOpenModal = (text, modalContent) => {
        dispatch(setHeaderText(text));
        dispatch(setModalContent(modalContent));
        dispatch(openModal());
    };

    const content = section === 0 ? (
        <div className="main">
            <p className="text_mln_f26_l26">{project.project_name}</p>
            <p className="text_mln_f20_l24">{project.project_description}</p>
        </div>
    ) : section === 1 ? (
        <div className="setting">
            <p className="text_mln_f26_l26">Technology</p>
            <div className="technology">
                {project.stacks && project.stacks.length > 0 ? (
                    project.stacks.slice(0, 4).map((stack) => (
                        <div key={stack.stack_id} className="stack">
                            <div className="dot_stack"></div>
                            <p className="text_mln_f20_l20">{stack.stack_name}</p>
                        </div>
                    ))
                ) : (
                    <p className="technology_none text_mln_f14_l14">There is no information at the moment</p>
                )}
            </div>
            <button className="more" onClick={() => hOpenModal('Technology', modalTechnology)}>
                <p className="text_mln_f16_l16">More</p>
            </button>
        </div>
    ) : (
        <div className="home">
            <p className="text_mln_f26_l26">Team</p>
            <div className="teamlead">
                <div className="image_teamlead"></div>
                <div className="teamlead_text">
                    <p className="text_mln_f20_l20">{project.project_teamlead_name} {project.project_teamlead_surname}</p>
                    <p className="text_mln_f14_l14">Teamlead</p>
                </div>
            </div>
            <div className="teamlead_line"></div>
            <button className="home_team" onClick={() => hOpenModal('Team', modalTeam)}>
                <p className="text_mln_f14_l14">show all team</p>
            </button>
            {role !== 'teamlead' ? (
                <button className="participate">
                    <p className="text_mln_f16_l16">Participate</p>
                </button>
            ) : (
                <div className="participate"></div>
            )}
        </div>
    );

    return (
        <div className="card fade_in">
            <img src={status === 'completed' ? ImageLastProject : status === 'notStarted' ? ImageFutureProject : ImageNowProject} alt="image_project" />
            {content}
            <div className="section">
                {icons.map((image, index) => (
                    <ButtonSectionCard key={index} image={image} active={section === index} onClick={() => handleClick(index)} />
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;