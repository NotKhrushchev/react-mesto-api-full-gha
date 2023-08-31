import React, { useState } from 'react';
import Auth from '../auth/Auth';
import auth from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../../store/actions/actions';

const Register = ({ setIsInfoTooltipOpen, setIsSuccess }) => {

    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    // Сабмит формы регистрации
    const handleRegister = (e) => {
        e.preventDefault();
        const {email, password} = formValue;
        dispatch({type: SET_LOADING_TRUE});
        auth.register(email, password)
        .then(() => {
            setIsSuccess(true);
        })
        .catch(err => {
            console.log(err);
            setIsSuccess(false);
        })
        .finally(() => {
            setIsInfoTooltipOpen(true);
            dispatch({type: SET_LOADING_FALSE});
        });
    };

    return (
        <Auth
            type={'register'}
            title={'Регистрация'}
            submitByttonText={'Зарегистрироваться'}
            onSubmit={handleRegister}
        >
            <input 
                type="text" 
                id="email-input" 
                name="email" 
                className="auth__input" 
                placeholder="Email" 
                required 
                value={formValue.email} 
                onChange={handleChange}
            />
            <span className="form__input-error email-input-error" style={{minHeight: '23px'}}></span>
            <input 
                type="password" 
                id="password-input" 
                name="password" 
                className="auth__input" 
                placeholder="Пароль" 
                required 
                value={formValue.password} 
                onChange={handleChange}
            />
            <span className="form__input-error password-input-error"></span>
        </Auth>
    );
};

export default Register;