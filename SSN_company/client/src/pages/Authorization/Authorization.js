import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Authorization.scss";
import Login from "../../assets/icons/login.svg";
import Password from "../../assets/icons/password.svg";
import { login } from "../../store/slices/authSlice";

const Authorization = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        const action = await dispatch(login({ email, password }));

        if (login.fulfilled.match(action)) {
            console.log('Авторизация прошла успешно');
            navigate('/project');    
        } else {
            console.error('Не удалось авторизоваться:', action.error);
        }
    };

    return (
        <main className="authorization full-width">
            <p className="text_mnt_f60_l60">SSN</p>
            <p className="text_mln_f36_l36">Entrance to the system</p>
            <form onSubmit={handleLogin}>
                <div className="form">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Login" />
                    <img src={Login} alt="Login" />
                </div>
                <div className="form">
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    <img src={Password} alt="Password" />
                </div>
                <div className="check">
                    <input type="checkbox" />
                    <p className="text_mln_f22_l22">Non-disclosure agreement</p>
                </div>
                <button type="submit">
                    <p className="text_mln_f26_l26">Authorisation</p>
                </button>
            </form>
            <div className="restore_item">
                <div className="restore">
                    <p className="text_mln_f22_l22">Restore login</p>
                    <div></div>
                </div>
                <div className="restore">
                    <p className="text_mln_f22_l22">Restore password</p>
                    <div></div>
                </div>
            </div>
        </main>
    );
};

export default Authorization;