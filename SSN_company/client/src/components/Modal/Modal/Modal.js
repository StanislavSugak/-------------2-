import React, { useEffect } from 'react';
import './Modal.scss'; // Импортируем стили
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/slices/modalSlice'; // Импортируем closeModal
import { BlockText, Paggination} from '../../../utils/components';

const Modal = () => {
    const dispatch = useDispatch();

    const { isOpen, headerText, modalContent  } = useSelector((state) => state.modal);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const closeModalHandler = () => {
        dispatch(closeModal()); 
    };

    return (
        <div className="modal-overlay" onClick={closeModalHandler}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModalHandler}>×</button>
                <p className="text_mln_f26_l26">{headerText}</p>
                {modalContent}
            </div>
        </div>
    );
};

export default Modal;   