import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from '../../components/LoginImage/LoginImage';
import AuthButton from "../../components/ButtonLogin/AuthButton";

import { AuthInputEmail, AuthInputUsername, AuthInputPassword, AuthInputName, AuthInputSurname, AuthInputPhoneNumber } from '../../components/AuthInput/AuthInput';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        isActive: true,
        password: ""
    });
    const url = "http://lambalog.com/api/user/register";

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const maskPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const errorData = await response.json();

        const errorMessage = !response.ok
            ? errorData.message || "Kullanıcı kaydı yapılamadı." : values.name === "" || values.surname === "" ||
                values.emailAddress === "" || values.phoneNumber === "" || values.username === "" ||
                values.password === "" ? "Kullanıcı bilgileri boş bırakılamaz" : "";
        errorMessage ? setError(errorMessage) : navigate("/");
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-register"><p>{message}</p></div>;
    };

    return (
        <section className="register-body-color">
            <section className="register-container">
                {/* Article Bağlangıç */}
                <article className="register-card">
                    {/* Card-Left Başlangıç */}
                    <LoginImage />
                    {/* Card-Left Bitiş */}
                    <div className="register-row">
                        {/* Card-Right Başlangıç */}
                        <article className="register-card-right">
                            <div className="user-register">
                                <h1>REGISTER</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <form className="input-group-register">
                                <AuthInputEmail value={values.emailAddress} onChange={handleInput} />
                                <AuthInputUsername value={values.username} onChange={handleInput} placeholder="Enter your Username" />
                                <AuthInputPassword value={values.password} onChange={handleInput} />
                                <AuthInputName value={values.name} onChange={handleInput} />
                                <AuthInputSurname value={values.surname} onChange={handleInput} />
                                <AuthInputPhoneNumber value={maskPhoneNumber(values.phoneNumber)} onChange={handleInput} />
                                <Link to="/" className="acconut-register">
                                    Do you already have an account?
                                </Link>
                            </form>
                            {error && <ErrorMessage message={error} />}
                            <AuthButton text="REGISTER" onClick={handleSubmit} />
                        </article>
                        {/* Card-Right Bitiş */}
                    </div>
                </article>
                {/* Article Bitiş */}
            </section>
        </section>
    );
}
