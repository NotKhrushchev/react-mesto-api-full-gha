import React, { useContext } from 'react';
import Card from '../card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Main = ({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardRemove }) => {
    
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}} onClick={onEditAvatar}/>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__interest">{currentUser.about}</p>
                    <button className="profile__edit-btn btn" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
                </div>
                <button className="profile__add-btn btn" type="button" aria-label="Добавить фото" onClick={onAddPlace}/>
            </section>
            <section className="cards">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        // Прокинул из App обработчик нажатия на карточку, удаление и лайк
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardRemove={onCardRemove}
                    />
                ))}
            </section>
        </main>
    );
};

export default Main;