import "./CreateCardMini.scss";

const CreateCardMini = ({ text, onClick }) => { 
    return (
        <div className="card_mini" onClick={onClick}>
            <button className="create_task_button">
                <p className="text_mln_f20_l20">{text}</p>
            </button>
        </div>
    );
};

export default CreateCardMini;
