import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjects, setCurrentFilter } from "../../store/slices/projectSlice";
import { setCurrentPage } from "../../store/slices/settingSlice"; 
import { Loading, HeaderProject, Search, PagginationCard, ProjectCard } from '../../utils/components';
import {  IconDoneProject, IconFutureProject, IconNowProject, IconSearch } from '../../utils/icon';
import "./Project.scss";
import { getTechnology } from "../../store/slices/technologySlice";

const headerText = {
    h1: "Task schedule",
    h2: "Daily operation"
};

const statusPorject = [
    { image: IconDoneProject, value: 'completed' },
    { image: IconNowProject, value: 'inProgress' },
    { image: IconFutureProject, value: 'notStarted' }
];

const Project = () => {
    const dispatch = useDispatch();

    const { employeeId, employeeRole } = useParams();

    const { id, role } = useSelector((state) => state.auth.user);
    const { projects, isLoading, currentFilter } = useSelector((state) => state.project);

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(setCurrentFilter('inProgress')); 

        const timer = setTimeout(() => {
            dispatch(getProjects({ id_user: employeeId || id, role: employeeRole || role }));
            dispatch(getTechnology());
            setLoading(false);
        }, 1000); 

        return () => clearTimeout(timer);
    }, [dispatch, id, role, employeeId, employeeRole]);

    const handleFilterChange = (filter) => {
        dispatch(setCurrentFilter(filter));
        dispatch(setCurrentPage(1)); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); 
    };

    const filteredProjects = () => {
        const projectsToFilter = (() => {
            switch (currentFilter) {
                case 'completed': return projects.completed;
                case 'notStarted': return projects.notStarted;
                case 'inProgress': return projects.inProgress;
                default: return [];
            }
        })();

        return projectsToFilter.filter(project =>
            project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const info = [
        { name: "Successful task", count: projects.completed?.length || 0 },
        { name: "Available tasks", count: projects.notStarted?.length || 0 },
        { name: "Running tasks", count: projects.inProgress?.length || 0 }
    ];

    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    <HeaderProject contentSearch={<Search text={"Search..."} customClass={"project"}  value={searchTerm}  onChange={handleSearchChange}/>} headerText={headerText} statusPorject={statusPorject} info={info} onFilterChange={handleFilterChange} />
                    <PagginationCard arrayCards={filteredProjects()} cardType="project" status={currentFilter}/>
                </>
            )}
        </>
    );
};

export default Project;