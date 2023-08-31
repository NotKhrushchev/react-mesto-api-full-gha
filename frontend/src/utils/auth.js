// Работа с авторизацией и регистрацией
class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    // Универсальная проверка ответа
    _checkAnswer(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Регистрация
    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => this._checkAnswer(res));
    }

    // Авторизация
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(res => this._checkAnswer(res));
    }

    // Проверка токена
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => this._checkAnswer(res));
    }
}

const auth = new Auth({
    baseUrl: 'http://localhost:3001'
});

export default auth;