import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import ImagePopup from './imagePopup/ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './popupProfile/EditProfilePopup';
import EditAvatarPopup from './popupAvatar/EditAvatarPopup';
import AddPlacePopup from './popupPlace/AddPlacePopup';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './register/Register';
import InfoTooltip from './infoTooltip/InfoTooltip';
import Login from './login/Login';
import auth from '../utils/auth';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../store/actions/actions';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Инициализирую состояние каждого попапа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // Проверка токена
  const handleTokenCheck = () => {
    if (localStorage.jwt) {
      // Прокидываю хэдер с токеном в api
      api.setHeaders({
        "Authorization": `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      });
      auth.checkToken(localStorage.jwt)
      .then(res => {
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
    };
  };

  // Получаю карточки и данные о пользователе при монтировании App
  useEffect(() => {
    // Проверяю токен при каждой загрузке приложения
    handleTokenCheck();
    
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // Обработчик нажатия на лайк карточки
  const handleCardLike = useCallback((card) => {

    // Повторно проверяем есть ли лайк на карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then(newCard => {
      setCards(cards => cards.map(e => e._id === card._id ? newCard : e));
    })
    .catch(err => console.log(err));
  }, [currentUser]);

  // Функции открытия попапов
  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true);
  }, []);

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  // Обработчик нажатия на мусорку карточки
  const handleCardRemove = useCallback((card) => {
    api.removeCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter(e => e._id !== card._id))
    })
    .catch(err => console.log(err));
  }, []);

  // Универсальная функция обработки запроса 
  const handleSubmit = (request) => {
    dispatch({type: SET_LOADING_TRUE});
    request()
    .then(() => closeAllPopups())
    .catch(err => console.log(err))
    .finally(() => dispatch({type: SET_LOADING_FALSE}))
  }

  // Обновление данных пользователя
  const handleUpdateProfile = (profileData) => {
    const setProfileInfo = () => {
      return api.setProfileInfo(profileData)
      .then(res => setCurrentUser(res))
    };
    handleSubmit(setProfileInfo);
  };

  // Обновление аватара
  const handleUpdateAvatar = (avatarLink) => {
    const setAvatar = () => {
      return api.setAvatar(avatarLink)
      .then(res => setCurrentUser(res))
    };
    handleSubmit(setAvatar);
  };

  // Добавление новой карточки
  const handleAddPlace = (cardData) => {
    dispatch({type: SET_LOADING_TRUE});
    api.postNewCard(cardData)
    .then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
    .finally(() => dispatch({type: SET_LOADING_FALSE}));
  };

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userEmail={userEmail}/>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route 
            path='/'
            element={
              <ProtectedRoute
                element={Main} 
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardRemove={handleCardRemove}
              />
            }
          />
          <Route
            path='/sign-up'
            element={<Register setLoggedIn={setLoggedIn} setIsInfoTooltipOpen={setIsInfoTooltipOpen} setIsSuccess={setIsSuccess}/>}
          />
          <Route
            path='/sign-in'
            element={<Login setLoggedIn={setLoggedIn} setUserEmail={setUserEmail}/>}
          />
        </Routes>
        <Footer/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
