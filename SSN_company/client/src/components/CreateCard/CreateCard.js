import "./CreateCard.scss";
import { IconCreatePlus } from '../../utils/icon';

const CreateCard = ({ text, type, onClick }) => {
    const cardClass = type ? `create_card fade_in ${type}` : "create_card fade_in";
    
    return (
        <div className={cardClass} onClick={onClick}>
            <button className="create_task_plus">
                <img src={IconCreatePlus} alt="fail" />
            </button>
            <button className="create_task_button">
                <p className="text_mln_f20_l20">{text}</p>
            </button>
        </div>
    );
};

export default CreateCard;
