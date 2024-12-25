import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/slices/projectSlice";
import { Loading, HeaderProject, SectionShaping, SelectProject, TableShaping } from '../../utils/components';
import { IconElaboration, IconSupporting, IconES, IconQuestion } from '../../utils/icon';
import "./Shaping.scss"; // Импортируем стили

const headerText = {
    h1: "Star cast",
    h2: "Tm structure"
};

const statusProject = [
    { image: IconElaboration, value: 'elaboration' },
    { image: IconSupporting, value: 'supporting' },
    { image: IconES, value: 'both' }
];

const headerElab = {
    h1: "Elaboration",
    h2: "Designing, building, and maintaining"
};

const headerSup = {
    h1: "Supporting",
    h2: "Analysing, managing and testing"
};

const Shaping = () => {
    const dispatch = useDispatch();
    const { projects, isLoading } = useSelector((state) => state.project);
    const { id, role } = useSelector((state) => state.auth.user);

    const [filter, setFilter] = useState("both");
    const [loading, setLoading] = useState(true);

     useEffect(() => {
            const timer = setTimeout(() => {
                dispatch(getProjects({ id_user: id, role: role }));
                setLoading(false);
            }, 1000); 
    
            return () => clearTimeout(timer);
        }, [dispatch, id, role]);

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const projectsArray = [
        ...(Array.isArray(projects.completed) ? projects.completed : []),
        ...(Array.isArray(projects.inProgress) ? projects.inProgress : []),
        ...(Array.isArray(projects.notStarted) ? projects.notStarted : []),
    ];

    const projectOptions = projectsArray.map(project => ({
        value: project, 
        label: project.project_name,
        key: project.project_id 
    }));

    const [selectProject, setSelectProject] = useState({})
    console.log(selectProject)
    const handleProjectSelect = (selected) => {
        setSelectProject(selected.value);
        console.log("Selected project:", selected);
    };

    const filteredProjects = () => {
        switch (filter) {
            case 'elaboration': return projects.filter(project => project.status === 'elaboration');
            case 'supporting': return projects.filter(project => project.status === 'supporting');
            case 'both': return projects;
            default: return [];
        }
    };

    const busFactor = selectProject.project_bus_factor;
    const status = selectProject?.project_date_end ? 1 : 0;
    const staffRequired = selectProject?.stacks ? 
        selectProject.stacks.reduce((total, stack) => total + stack.required_count, 0) : 0;

    const info = [
        { name: "Staff required", count: staffRequired },
        { name: "Bus-factor", count: busFactor || 0}, //
        { name: "Status complet", count: status }
    ];
    
    const [elaborationStacks, setElaborationStacks] = useState([]);
    const [supportingStacks, setSupportingStacks] = useState([]);
    const [elaborationUsers, setElaborationUsers] = useState([]);
    const [supportingUsers, setSupportingUsers] = useState([]);

    useEffect(() => {
        if (selectProject?.stacks) {
            // Фильтруем стеки на основе направления
            const elaboration = selectProject.stacks.filter(stack =>
                ["Frontend", "Backend", "UI/UX designer", "Database developer"].includes(stack.direction_name)
            );
    
            const supporting = selectProject.stacks.filter(stack =>
                !["Frontend", "Backend", "UI/UX designer", "Database developer"].includes(stack.direction_name)
            );
    
            setElaborationStacks(elaboration);
            setSupportingStacks(supporting);
    
            const elaborationStackIds = elaboration.map(stack => stack.stack_id);
            const supportingStackIds = supporting.map(stack => stack.stack_id);
    
            if (selectProject.users && selectProject.users.length > 0) {
                const mainUserIds = selectProject.main_user.map(mu => mu.user_id); // или mu.stack_id, если это ваше основное
    
                // Фильтруем полные объекты пользователей на основе их идентификаторов для elaboration
                const newElaborationUsers = selectProject.users.filter(user => 
                    selectProject.main_user.some(mu => 
                        elaborationStackIds.includes(mu.stack_id) && mu.user_id === user.user_id
                    )
                );
    
                // Фильтруем полные объекты пользователей на основе их идентификаторов для supporting
                const newSupportingUsers = selectProject.users.filter(user => 
                    selectProject.main_user.some(mu => 
                        supportingStackIds.includes(mu.stack_id) && mu.user_id === user.user_id
                    )
                );
    
                // Добавляем ID главного стека к пользователям
                const elaborationUsersWithStackId = newElaborationUsers.map(user => {
                    const mainStack = selectProject.main_user.find(mu => mu.user_id === user.user_id);
                    return {
                        ...user,
                        main_stack_id: mainStack ? mainStack.stack_id : null // или другое значение по умолчанию
                    };
                });
    
                const supportingUsersWithStackId = newSupportingUsers.map(user => {
                    const mainStack = selectProject.main_user.find(mu => mu.user_id === user.user_id);
                    return {
                        ...user,
                        main_stack_id: mainStack ? mainStack.stack_id : null // или другое значение по умолчанию
                    };
                });
    
                setElaborationUsers(elaborationUsersWithStackId);
                setSupportingUsers(supportingUsersWithStackId);
            } else {
                // Если пользователей нет, очищаем массивы пользователей
                setElaborationUsers([]);
                setSupportingUsers([]);
            }
        } else {
            setElaborationStacks([]);
            setSupportingStacks([]);
            setElaborationUsers([]);
            setSupportingUsers([]);
        }
    }, [selectProject, selectProject.users]);


    const handleStartProject = () => {
        // Ваша логика для старта проекта
        console.log('Старт проекта');
    };

    const handleFinishProject = () => {
        // Ваша логика для завершения проекта
        console.log('Закончить проект');
    };

    console.log(elaborationUsers)
    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    <HeaderProject contentSearch={<SelectProject options={projectOptions} onSelect={handleProjectSelect} />} 
                        headerText={headerText} statusPorject={statusProject} info={info} onFilterChange={handleFilterChange} />
                    <SectionShaping  headerText={headerElab}  isVisible={filter === 'elaboration' || filter === 'both'} toggleVisibility={() => handleFilterChange('elaboration')}>
                        {selectProject && Object.keys(selectProject).length > 0 && ( 
                            <TableShaping stacks={elaborationStacks} users={elaborationUsers} id_project={selectProject.project_id} main_user={selectProject.main_user}/>
                        )}
                    </SectionShaping>
                    <SectionShaping headerText={headerSup}  isVisible={filter === 'supporting' || filter === 'both'} toggleVisibility={() => handleFilterChange('supporting')}>
                        {selectProject && Object.keys(selectProject).length > 0 && ( 
                            <TableShaping stacks={supportingStacks} users={supportingUsers} id_project={selectProject.project_id} main_user={selectProject.main_user}/>
                        )}
                    </SectionShaping>
                    <div className="shaping_start">
                        <div className="ss_bus">
                            <p className="text_mln_f24_l24">Calculate</p>
                            <button>
                                <p className="text_mln_f18_l18">Bus-factor</p>
                            </button>
                            <span>
                                <img src={IconQuestion} alt="" />
                            </span>
                        </div>
                        <div className="ss_start">
                            {selectProject.project_date_delay === null && selectProject.project_date_end === null && (
                                <button onClick={handleStartProject}>Start project</button>
                            )}

                            {selectProject.project_date_delay !== null && selectProject.project_date_end === null && (
                                <button onClick={handleFinishProject}>End project</button>
                            )}

                            {selectProject.project_date_end !== null && (
                                <button disabled>Proect is end</button>
                            )}
                            {/* <button>
                                <p className="text_mln_f18_l18">Start project</p>
                            </button> */}
                            <span>
                                <img src={IconQuestion} alt="" />
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Shaping;