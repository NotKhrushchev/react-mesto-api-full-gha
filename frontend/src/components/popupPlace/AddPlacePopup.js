import React, { useEffect, useState } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

    const [formValue, setFormValue] = useState({
        name: '',
        link: ''
    });

    // Сбрасываю форму при каждом открытиии попапа
    useEffect(() => {
        setFormValue({
            name: '',
            link: ''
        });
    }, [isOpen]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    // Сабмит формы создания карточки
    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace(formValue);
    };

    return (
        <PopupWithForm
            title='Новое место'
            name='place'
            submitByttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                id="name-img-input" 
                name="name" 
                className="form__input form__input_type_name" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30"
                onChange={handleChange}
                value={formValue.name}
            />
            <span className="form__input-error name-img-input-error"></span>
            <input 
                type="url" 
                id="url-input" 
                name="link" 
                className="form__input form__input_type_link" 
                placeholder="Ссылка на картинку" 
                required 
                onChange={handleChange}
                value={formValue.link}
            />
            <span className="form__input-error url-input-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;