import React, { useState } from "react";
import "./ItemLearn.scss";
import { IconDeleteBag, IconDirectionLearn } from "../../utils/icon";
import { endWish } from "../../store/slices/technologySlice";
import { useDispatch } from "react-redux";

const ItemLearn = ({index, study}) => {
    const styleClass = index % 2 === 0 ? "even" : "odd";

    const dispatch = useDispatch();

    const handleDelete = async () => {
        dispatch(endWish({ id: study.id_learn })); 
        window.location.reload();
    };

    return (
        <div className={`learn_card ${styleClass}`}>
            <div>
                <div className="lc_detail">
                    <p className="text_mln_f18_l18">Details</p>
                </div>
                <p className="text_mln_f16_l16">{study.date_enter}</p>
                <button className="lc_delete" onClick={handleDelete}>
                    <img src={IconDeleteBag} alt="del" />
                </button>
            </div>
            <div>
                <img src={IconDirectionLearn} alt="dir" />
                <div>
                    <p className="text_mln_f22_l22">{study.name}</p>
                    <p className="text_mln_f14_l14">{study.direction}</p>
                </div>
            </div>

        </div>
    );
};

export default ItemLearn;
