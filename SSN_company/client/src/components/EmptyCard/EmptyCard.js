import "./EmptyCard.scss";
import { IconCreatePlus } from '../../utils/icon';

const EmptyCard = ({ text }) => {
    return (
        <div className="empty_card fade_in">
            <button className="empty_task_button">
                <p className="text_mln_f20_l20">{text}</p>
            </button>
        </div>
    );
};

export default EmptyCard;
