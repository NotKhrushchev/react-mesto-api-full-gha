import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { usePopupClose } from '../../hooks/usePopupClose';

const EditProfilePopup = ({ isOpen, onClose, onUpdateProfile }) => {

    usePopupClose(isOpen, onClose);

    // Подписываюсь на контекст с информацией о пользователе
    const currentUser = useContext(CurrentUserContext);

    const [formValue, setFormValue] = useState({
        name: '',
        about: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            setFormValue({
                name: currentUser.name,
                about: currentUser.about
            })
        }
    }, [currentUser, isOpen]);

    // Сабмит формы изменения профиля
    const handleEditProfileSubmit = (e) => {
        e.preventDefault();

        onUpdateProfile(formValue);
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile'
            submitByttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleEditProfileSubmit}
        >
            <input 
                type="text" 
                id="name-input" 
                name="name" 
                className="form__input form__input_type_name" 
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40" 
                value={formValue.name} 
                onChange={handleChange}
            />
            <span className="form__input-error name-input-error"></span>
            <input 
                type="text" 
                id="about-input" 
                name="about" 
                className="form__input form__input_type_about" 
                placeholder="О себе" 
                required
                minLength="2"
                maxLength="200"
                value={formValue.about}
                onChange={handleChange}
            />
            <span className="form__input-error interest-input-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;