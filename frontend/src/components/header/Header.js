import React from 'react';
import mestoLogo from '../../images/logo/mesto_logo.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, setLoggedIn, userEmail }) => {

    const navigate = useNavigate();

    // Получаем эндпоинт адресной строки
    const currentPage = useLocation().pathname.split('/').pop();

    // Выход из приложения
    const onSignOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/sign-in', {replace: true});
    }

    return (
        <header className="header">
            <img src={mestoLogo} alt="Логотип 'Место'" className="header__logo" draggable="false"/>
            <div className='header__nav-section'>
                {loggedIn && <p className='header__userLogin'>{userEmail}</p>}
                {currentPage === 'sign-in'
                    ? 
                    <NavLink to='/sign-up' className="header__nav-link">Регистрация</NavLink>
                    : 
                    <NavLink to='/sign-in' className="header__nav-link" onClick={loggedIn && onSignOut}>{loggedIn ? 'Выйти' : 'Войти'}</NavLink>
                }
            </div>
        </header>
    );
};

export default Header; 