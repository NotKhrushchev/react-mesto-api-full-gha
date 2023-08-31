// Работа с Api
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }
    
    setHeaders(headers) {
        this._headers = headers;
    }

    // Универсальная проверка ответа
    _checkAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Запрос на получение информации профиля
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => this._checkAnswer(res));
    }

    // Запрос на изменение информации профиля
    setProfileInfo(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.name,
                about: profileData.about
            })
        })
        .then(res => this._checkAnswer(res));
    }

    // Запрос на загрузку всех карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => this._checkAnswer(res));
    }

    // Запрос на публикацию карточки
    postNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then(res => this._checkAnswer(res));
    }

    // Запрос на удаление карточки
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => this._checkAnswer(res));
    }

    // Запрос на изменение статуса лайка карточки
    changeLikeCardStatus(cardId, isLiked) {
        if(!isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(res => this._checkAnswer(res));
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._checkAnswer(res));
        }
    }

    // Запрос на изменение аватара 
    setAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => this._checkAnswer(res));
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3001',
});

export default api;