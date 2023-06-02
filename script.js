/* Открытие попапа с профилем */
const popupProfile = document.querySelector('#popup-profile');
const editButton = document.querySelector('.profile__edit-button');
const removeButton = document.querySelector('#popup-close');


function openPopup() {
    popupProfile.classList.add('popup_opened');
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
removeButton.addEventListener('click', closePopup);

/* Изменение данных профиля */

const nameInput = popupProfile.querySelector('#popup-name');
const jobInput = popupProfile.querySelector('#popup-profession');

function forSubmitHandler(evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__description');
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    closePopup();
}

/* Добавление карточек */

popupProfile.addEventListener('submit', forSubmitHandler);

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
const fullSizeImage = document.querySelector('#popup-full-img');
function addElements(nameElement, linkElement) {
    const elementTemplate = document.querySelector('#element').content;
    const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
    elementContainer.querySelector('.element__img').src = linkElement;
    elementContainer.querySelector('.element__text').textContent = nameElement;
    elementsContainer.prepend(elementContainer);
    const likeButton = document.querySelector('.element__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    const deleteButton = document.querySelector('.element__trash');
    deleteButton.addEventListener('click', function () {
        elementContainer.remove();
    });
    /* Открываем изображение */
    const bigImage = document.querySelector('.popup__image');
    const popupSigma = document.querySelector('.popup__signa');
    const smallImage = document.querySelector('.element__img');
    const elSigma = document.querySelector('.element__text');

    function openFullSizeImage() {
    bigImage.src = smallImage.src;
    popupSigma.textContent = elSigma.textContent;
    fullSizeImage.classList.add('popup_opened');
}
    smallImage.addEventListener('click', openFullSizeImage);
}

addElements(initialCards[5].name, initialCards[5].link);
addElements(initialCards[4].name, initialCards[4].link);
addElements(initialCards[3].name, initialCards[3].link);
addElements(initialCards[2].name, initialCards[2].link);
addElements(initialCards[1].name, initialCards[1].link);
addElements(initialCards[0].name, initialCards[0].link);

const popupImg = document.querySelector('#popup-img');
const editImgButton = document.querySelector('.profile__button');
const removeImgButton = document.querySelector('#popup-img-close');

function openImgPopup() {
    popupImg.classList.add('popup_opened');
}

function closeImgPopup() {
    popupImg.classList.remove('popup_opened');
}

editImgButton.addEventListener('click', openImgPopup);
removeImgButton.addEventListener('click', closeImgPopup);

const placeInput = document.querySelector('#popup-place');
const linkInput = document.querySelector('#popup-link');

function forSubmitImgHandler(evt) {
    evt.preventDefault();
    let placeInputValue = placeInput.value;
    let linkInputValue = linkInput.value;
    addElements(placeInputValue, linkInputValue);
    placeInput.value = '';
    linkInput.value = '';
    closeImgPopup();
}

popupImg.addEventListener('submit', forSubmitImgHandler);


const closeFullSizeButton = document.querySelector('#popup-fullsize-close');
closeFullSizeButton.addEventListener('click', function () {
    fullSizeImage.classList.remove('popup_opened');
});