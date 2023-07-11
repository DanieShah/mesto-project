export const popupProfile = document.querySelector('#popup-profile');
export const popupProfileForm = document.querySelector('#popup-profile-form');
export const formPopupFullSizeImage = document.querySelector('#popup-img-form');
export const editButton = document.querySelector('.profile__edit-button');
export const buttonClosePopupProfile = document.querySelector('.popup__close');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const nameInput = popupProfile.querySelector('#popup-name');
export const jobInput = popupProfile.querySelector('#popup-profession');
export const popupAddNewCard = document.querySelector('#popup-img');
export const editImgButton = document.querySelector('.profile__button');
export const buttonClosePopupFullSizeImage = document.querySelector('#popup-img-close');
export const placeInput = document.querySelector('#popup-place');
export const linkInput = document.querySelector('#popup-link');
export const closeFullSizeButton = document.querySelector('#popup-fullsize-close');
export const popupFullSizeImage = document.querySelector('#popup-full-img');
export const popupBox = document.querySelector('.popup__box');
export const avatar = document.querySelector('.profile__avatar');
export const avatarImg = avatar.querySelector('.profile__avatar-img');
export const avatarButton = avatar.querySelector('.profile__avatar-button');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupAvatarForm = popupAvatar.querySelector('#popup-avatar-form');
export const buttonCloseAvatarPopup = document.querySelector('#popup-avatar-close');
export const inputAvatarLink = document.querySelector('#input-avatar');
export const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

import { openPopup, closePopup } from "./utils";
import { renderCard, loadingCardsFromServer,  putAndDeletLikeOnServer, deleteCardFromSite } from "./card";
import { toggleButtonState } from "./validate.js";
import { patchTheProfile, downloadingUserInformationFromServer, addNewCardToServer, changeAvatar, deleteCardsFromServer } from './api.js';

export function loadingPageWithUpdateProfileData() {
  downloadingUserInformationFromServer()
  .then (data => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    avatarImg.src = data.avatar;
  });
}

export function openProfilePopup(popup){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
}

export function openAvatarProfile(popup) {
  const inputList = Array.from(popupAvatar.querySelectorAll('.popup__input'));
  const submitButton = popupAvatar.querySelector('.popup__button');
  toggleButtonState(inputList, submitButton, settingsForValidation);
  openPopup(popup);
}

export function changeUserData(evt) {
    evt.preventDefault();
    const inputList = Array.from(popupProfile.querySelectorAll('.popup__input'));
    const submitButton = popupProfile.querySelector('.popup__button');
    renderLoading(true, submitButton);
    patchTheProfile(nameInput.value, jobInput.value)
    .then (data => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      nameInput.value = data.name;
      jobInput.value = data.about;
    })
    .then (() => {
      renderLoading(false, submitButton);
    })
    .then (() => {
      toggleButtonState(inputList, submitButton, settingsForValidation);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => closePopup(popupProfile));
}

export function forSubmitImgHandler(evt) {
    evt.preventDefault();
    const placeInputValue = placeInput.value;
    const linkInputValue = linkInput.value;
    const inputList = Array.from(popupAddNewCard.querySelectorAll('.popup__input'));
    const submitButton = popupAddNewCard.querySelector('.popup__button');
    renderLoading(true, submitButton);
    addNewCardToServer(placeInputValue, linkInputValue)
    .then (data => {
      renderCard(data.name, data.link);
      const numberOfLikes = document.querySelector('.element__like-quantity');
      const trashButton =  document.querySelector('.element__trash');
      const likeButton = document.querySelector('.element__like');
      trashButton.addEventListener('click',() => {
        deleteCardsFromServer(data._id);
      });
  
      likeButton.addEventListener('click', () => {
        putAndDeletLikeOnServer(likeButton, numberOfLikes, data._id);
      });
    })
    .then (() => {
      toggleButtonState(inputList, submitButton, settingsForValidation);
      closePopup(popupAddNewCard)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => renderLoading(false, submitButton));
    formPopupFullSizeImage.reset();
}

export function forSubmitAvatarHandler(evt) {
    evt.preventDefault();
    const inputList = Array.from(popupAvatar.querySelectorAll('.popup__input'));
    const submitButton = popupAvatar.querySelector('.popup__button');
    renderLoading(true, submitButton);
    avatarImg.src = inputAvatarLink.value;
    changeAvatar(inputAvatarLink.value)
    .then (() => {
      toggleButtonState(inputList, submitButton, settingsForValidation);
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => renderLoading(false, submitButton));
    popupAvatarForm.reset();

}

function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

