import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Card = React.memo(({ card, onCardClick, onCardLike, onCardRemove }) => {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(user => user === currentUser._id);

    return (
        <article className="card">
            {isOwn && <button className="card__remove-btn btn" aria-label="Удалить карточку" onClick={() => onCardRemove(card)}/>}
            <img className="card__img" src={card.link} alt={`Фото места: ${card.name}`} draggable="false" onClick={() => onCardClick(card)}/>
            <div className="card__info">
                <p className="card__desc">{card.name}</p>
                <div className="card__like-section">
                    <button className={`card__like-btn btn ${isLiked && "card__like-btn_liked"}`} aria-label="Отметить понравившееся фото" onClick={() => onCardLike(card)}/>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
});

export default Card;