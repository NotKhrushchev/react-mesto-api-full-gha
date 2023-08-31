// Общий попап с формой
import React from 'react';
import { useSelector } from 'react-redux';
import { usePopupClose } from '../../hooks/usePopupClose';

const PopupWithForm = ({ title, name, submitByttonText, isOpen, onClose, onSubmit, children }) => {

    usePopupClose(isOpen, onClose);

    const isLoading = useSelector(state => state.loader.isLoading);

    return (
        // Изменяем класс попапа в зависимости от состояния isOpened
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className="form form_type_profile" name={`${name}-form`} onSubmit={onSubmit}>
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button className="form__save-btn btn" type="submit" aria-label="Сохранить">{isLoading ? `${submitByttonText}...` : submitByttonText}</button>
                </form>
                <button className="popup__close-btn profile-close-btn btn" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default PopupWithForm;