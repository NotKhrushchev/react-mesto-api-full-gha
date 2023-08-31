import React, { useEffect, useRef } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

    // Через референс получаю значение value из инпута для аватарки
    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = '';
    }, [isOpen]);

    const handleUpdateAvatarSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar(avatar.current.value);
    };

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='set-avatar'
            submitByttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleUpdateAvatarSubmit}
        >
            <input 
                ref={avatar} 
                type="url" 
                id="avatar-input" 
                name="link" 
                className="form__input form__input_type_link" 
                placeholder="Ссылка на фото" 
                required
            />
            <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;