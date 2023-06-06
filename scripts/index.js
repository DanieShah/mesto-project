/* Открытие попапа с профилем */
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('#popup-profile-form');
const popupImgForm = document.querySelector('#popup-img-form');
const editButton = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const bigImage = document.querySelector('.popup__image');
const popupSigma = document.querySelector('.popup__signa');
const nameInput = popupProfile.querySelector('#popup-name');
const jobInput = popupProfile.querySelector('#popup-profession');


function openPopup(popup) {
   nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => openPopup(popupProfile));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

/* Изменение данных профиля */

function changeUserData(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    closePopup(popupProfile);
}

/* Добавление карточек */

popupProfileForm.addEventListener('submit', changeUserData);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const elementsContainer = document.querySelector('.elements');
const popupFullSizeImage = document.querySelector('#popup-full-img');

function addElements(nameElement, linkElement) {
    const elementTemplate = document.querySelector('#element').content;
    const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
    elementContainer.querySelector('.element__img').src = linkElement;
    elementContainer.querySelector('.element__text').textContent = nameElement;
    const likeButton = elementContainer.querySelector('.element__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    const deleteButton = elementContainer.querySelector('.element__trash');
    deleteButton.addEventListener('click', function () {
        elementContainer.remove();
    });


    /* Открываем изображение */
    const smallImage = elementContainer.querySelector('.element__img');
    const elSigma = elementContainer.querySelector('.element__text');
    
    function openFullSizeImage() {
      bigImage.src = smallImage.src;
      popupSigma.textContent = elSigma.textContent;
      popupFullSizeImage.classList.add('popup_opened');
    }
    
    smallImage.addEventListener('click', openFullSizeImage);
    return elementContainer;
}

function renderCard(nameElement, linkElement) {
  elementsContainer.prepend(addElements(nameElement, linkElement));
}

renderCard(initialCards[5].name, initialCards[5].link);
renderCard(initialCards[4].name, initialCards[4].link);
renderCard(initialCards[3].name, initialCards[3].link);
renderCard(initialCards[2].name, initialCards[2].link);
renderCard(initialCards[1].name, initialCards[1].link);
renderCard(initialCards[0].name, initialCards[0].link);

const popupAddNewCard = document.querySelector('#popup-img');
const editImgButton = document.querySelector('.profile__button');
const buttonClosePopupFullSizeImage = document.querySelector('#popup-img-close');

editImgButton.addEventListener('click', () => openPopup(popupAddNewCard));
buttonClosePopupFullSizeImage.addEventListener('click', () => closePopup(popupAddNewCard));

const placeInput = document.querySelector('#popup-place');
const linkInput = document.querySelector('#popup-link');

function forSubmitImgHandler(evt) {
    evt.preventDefault();
    const placeInputValue = placeInput.value;
    const linkInputValue = linkInput.value;
    renderCard(placeInputValue, linkInputValue);
    placeInput.value = '';
    linkInput.value = '';
    closePopup(popupAddNewCard);
}

popupImgForm.addEventListener('submit', forSubmitImgHandler);


const closeFullSizeButton = document.querySelector('#popup-fullsize-close');
closeFullSizeButton.addEventListener('click', function () {
  popupFullSizeImage.classList.remove('popup_opened');
});