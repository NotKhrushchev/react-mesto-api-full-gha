import React, { useState } from 'react';
import Auth from '../auth/Auth';
import auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = ({setLoggedIn, setUserEmail}) => {

    const navigate = useNavigate();
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

    // Сабмит формы логина
    const handleLogin = (e) => {
        e.preventDefault();
        const {email, password} = formValue;
        dispatch({type: 'SET_LOADING_TRUE'});
        auth.login(email, password)
        .then(res => {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            setUserEmail(email);
            navigate('/', {replace: true});
        })
        .catch(err => console.log(err))
        .finally(() => dispatch({type: 'SET_LOADING_FALSE'}));
    };

    return (
        <Auth
            type={'login'}
            title={'Вход'}
            submitByttonText={'Войти'}
            onSubmit={handleLogin}
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

export default Login;