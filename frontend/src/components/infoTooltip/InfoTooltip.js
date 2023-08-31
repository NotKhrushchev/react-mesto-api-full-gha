import React from 'react';
import statusOk from '../../images/status_ok.svg';
import statusError from '../../images/status_error.svg'

const InfoTooltip = ({isOpen, isSuccess, onClose}) => {
    return (
        // Изменяем класс попапа в зависимости от состояния isOpened
        <div className={`popup popup_type_status ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className='status'>
                    <img src={isSuccess ? statusOk : statusError} alt='Картинка статуса' className='status__img'/>
                    <p className='status__title'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
                </div>
                <button className="popup__close-btn profile-close-btn btn" type="button" aria-label="Закрыть окно" onClick={onClose}/>
            </div>
        </div>
    );
};

export default InfoTooltip;