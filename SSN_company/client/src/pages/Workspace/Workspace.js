import React, { useEffect, useState } from "react";
import "./Workspace.scss";
import { PersonalInfo, PersonalLink, Loading, PagginationTechnology, ItemGrade, PagginationGrade, PagginationKnow, CreateCardMini, Input, Paggination, NoneLine, ButtonCreate, Select } from '../../utils/components';
import {IconBlackTelegram, IconBlackVK, IconBlackInstagram, IconBlackGmail, IconBlackLinkedIn, IconFrameLib, IconTechnology, IconAttention} from '../../utils/icon'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addStackUser, getUser } from "../../store/slices/userSlice";
import { STATIC_URL } from "../../http";
import { openModal, setHeaderText, setModalContent } from "../../store/slices/modalSlice";
import {updateUser} from '../../store/slices/userSlice'
import { getTechnology } from '../../store/slices/technologySlice';

const Workspace = () => {
    const dispatch = useDispatch();

    const pageOther = useSelector((state) => state.setting.pageOther); 
    const { id } = useSelector((state) => state.auth.user);

    const {isLoading, user} = useSelector((state) => state.user);

    const { employeeId } = useParams();
    
    const [loading, setLoading] = useState(true);
    const [personalData, setPersonalData] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getUser({id_user: employeeId || id}));
            setLoading(false);
        }, 1000); 
    
        return () => clearTimeout(timer);
    }, [dispatch, employeeId, id]);

    useEffect(() => {
        if (user) {
            setPersonalData([
                {
                    parameter: 'Patronymic',
                    value: user.patronymic,
                },
                {
                    parameter: 'Number',
                    value: user.telephone ,
                },
                {
                    parameter: 'Birthday',
                    value: user.birthday,
                },
                {
                    parameter: 'Address',
                    value: user.address,
                },
            ]);

        }
    }, [user]); 

    const personalLink = user ? [
        {
            icon: IconBlackTelegram,
            link: `https://t.me/${user.telegram_name}`,
        },
        {
            icon: IconBlackVK,
            link: `https://vk.com/${user.vk_name}`,
        },
        {
            icon: IconBlackInstagram,
            link: `https://instagram.com/${user.instagram_name}`,
        },
        {
            icon: IconBlackGmail,
            link: `mailto:${user.email}`,
        },
        {
            icon: IconBlackLinkedIn,
            link: `https://linkedin.com/in/${user.linkedin_name}`,
        },
    ] : [];

    const personalStack = user ? [
        {
            icon: IconFrameLib,
            text: "Framework & Libraries",
            array: user.stacks_libraries_technologies
        },
        {
            icon: IconTechnology,
            text: "Technology",
            array: user.stacks_others
        }
    ] : [];


    const hOpenModal = (text, modalContent) => {
            dispatch(setHeaderText(text));
            dispatch(setModalContent(modalContent));
            dispatch(openModal());
        };

    const handleEdit = () => {
        const modalContent = <UserProfileEdit user={user}/>;
        hOpenModal('Change profile', modalContent);
    
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputSubmit = () => {
        const value = parseInt(inputValue);
        if (value >= 1 && value <= 5) {
            console.log('Input value:', value);
            setInputValue(''); // Очистка инпута после отправки
        } else {
            console.error('Value must be between 1 and 5');
        }
    };

    const handleCreate = () => {
        const allStacks = stack.flatMap(item => item.stacks);
        const modalContent = <StackSelector allStacks={allStacks} id={employeeId}/>;
        hOpenModal('Add stack', modalContent);
    };

    useEffect(() => {
        dispatch(getTechnology());
    }, [dispatch]);
    const stack = useSelector((state) => state.technology.stack);
    console.log(stack)
    const [inputValue, setInputValue] = useState(''); 


    return(
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="workspace">
                        <div className="w_info fade_in">
                            <div className="wp_info">
                                <div className="wp_info_image">
                                    <img src={`${STATIC_URL}/${user.image}`} alt="image"className="u_image" />
                                    <p className="text_mln_f14_l14">{user.date_hire}</p>
                                    <button onClick={handleEdit}>
                                        <p className="text_mln_f22_l20">Edit profile</p>
                                    </button>
                                </div>
                                <div className="wp_info_data">
                                    <div>
                                        <p className="text_mln_f30_l30">{user.name} {user.surname}</p>
                                        <p className="text_mln_f18_l18">{user.direction_name}</p>
                                    </div>
                                    {personalData && personalData.map((personal, index) => {
                                        return (
                                            <PersonalInfo key={index} parameter={personal.parameter} value={personal.value} />
                                        )
                                    })}
                                    <div className="wp_info_link">
                                        {personalLink.map((link, index) => {
                                            return(
                                                <PersonalLink key={index} icon={link.icon} link={link.link} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="wp_technology">
                                <div>
                                    <div className="t_language">
                                        <div>
                                            <div>
                                                <p className="text_mln_f22_l22">Programming languages</p>
                                                <img src={IconAttention} alt="icon" />
                                            </div>
                                            <PagginationGrade language={user.stacks_languages} />
                                        </div>
                                        <p className="text_mln_f22_l20">More info</p>
                                    </div>
                                    {pageOther && <CreateCardMini text={"Add stack"} onClick={handleCreate} />}
                                </div>
                                
                                <div>
                                    {personalStack.map((stack, index) => (
                                        <PagginationTechnology key={index} stack={stack} />
                                    ))}
                                    {pageOther && <CreateCardMini text={"Change stack"} />}
                                </div>
                            </div>
                        </div>
                        <PagginationKnow learn={user.stacks_learning_in_progress}/>
                        {console.log(user)}
                    </div>               
                </>
            )}
        </> 
    )
}

export default Workspace

const UserProfileEdit = ({ user }) => {
    const dispatch = useDispatch();

    const { id } = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        name: user.name || '',
        surname: user.surname || '',
        patronymic: user.patronymic || '',
        birthday: user.birthday ? user.birthday.split('T')[0] : '',
        telephone: user.telephone || '',
        address: user.address || '',
        image: user.image || '',
        vk_name: user.vk_name || '',
        instagram_name: user.instagram_name || '',
        telegram_name: user.telegram_name || '',
        linkedin_name: user.linkedin_name || '',
        date_hire: user.date_hire ? user.date_hire.split('T')[0] : ''
    });

    const handleChange = (field) => (value) => {
        if (typeof value === 'string' && value.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value
            }));
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file // Сохраняем файл в состояние
            }));
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) { 
            const userPersonalData = {id_user: id, ...formData}        
            dispatch(updateUser({userPersonalData})); 
            setIsSubmitting(false);
        }
    }, [isSubmitting, formData, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        // Логика для отправки данных на сервер
        console.log('Данные формы:', Array.from(formDataToSend.entries())); // Для отладки
        setIsSubmitting(true); // Устанавливаем флаг отправки
    };

    return (
        <>
            <Paggination>
                <Input text={formData.name} type="text" dispatchAction={handleChange('name')} />
                <Input text={formData.surname} type="text" dispatchAction={handleChange('surname')} />
                <Input text={formData.patronymic} type="text" dispatchAction={handleChange('patronymic')} />
                <Input text={formData.birthday} type="date" dispatchAction={handleChange('birthday')} />
                <Input text={formData.telephone} type="tel" dispatchAction={handleChange('telephone')} />
                <Input text={formData.address} type="text" dispatchAction={handleChange('address')} />
                <Input text={"vk_name"} type="text" dispatchAction={handleChange('vk_name')} />
                <Input text={"instagram_name"} type="text" dispatchAction={handleChange('instagram_name')} />
                <Input text={"telegram_name"}type="text" dispatchAction={handleChange('telegram_name')} />
                <Input text={"linkedin_name"} type="text" dispatchAction={handleChange('linkedin_name')} />
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </Paggination>
            <NoneLine />
            <ButtonCreate  text={"Change"} onNext={handleSubmit}/>
        </>
    );
};

const StackSelector = ({ allStacks, id }) => {
    const dispatch = useDispatch();
    const [selectedStack, setSelectedStack] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(''); // Состояние для инпута
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleSelect = (option) => {
        setSelectedStack(option);
        setIsOpen(false);
    };

    const options = allStacks.map(stackItem => ({
        value: stackItem.stack_id,
        label: stackItem.stack_name
    }));
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        
        // Проверка, что введено числовое значение
        if (value === '' || /^[1-5]$/.test(value)) {
            setInputValue(value);
        } else {
            alert('Value must be between 1 and 5');
        }
    };
    return (
        <>
            <Select
                isOpen={isOpen}
                onToggle={handleToggle}
                options={options}
                onSelect={handleSelect}
                selectedOption={selectedStack}
                placeholder="Select a stack"
            />
            <input 
                type="number" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Enter a number (1-5)" 
                min="1" 
                max="5"
            />
            <NoneLine />
            <ButtonCreate 
                text={"Add"} 
                onNext={() => {
                    if(selectedStack && inputValue){
                        const userStack = {
                            id_user: id,      
                            id_stack: selectedStack.value,
                            grade: parseInt(inputValue),
                            is_mentor: false,
                        };
                        dispatch(addStackUser(userStack)); 
                        window.location.reload();
                    }
                }} 
            />
        </>
    );
};
