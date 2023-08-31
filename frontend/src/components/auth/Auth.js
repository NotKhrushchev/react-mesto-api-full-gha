import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = ({ type, title, submitByttonText, onSubmit, children }) => {

    const isLoading = useSelector(state => state.loader.isLoading);

    return (
        <div className='auth'>
            <form className={`form form_type_auth`} onSubmit={onSubmit}>
                <h1 className='form__header_type_auth'>{title}</h1>
                {children}
                <button className="form__save-btn form__save-btn_type_auth btn" type="submit" aria-label="Сохранить">{isLoading ? `${submitByttonText}...` : submitByttonText}</button>
            </form>
            {type === 'register' && <p className='auth__subtitle'>Уже зарегистрированы? <NavLink to='/sign-in' className='auth__nav-link'>Войти</NavLink></p>}
        </div>
    );
};

export default Auth;