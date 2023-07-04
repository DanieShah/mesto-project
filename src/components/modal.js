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
export const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

import { openPopup, closePopup } from "./utils";
import { renderCard } from "./card";
import { toggleButtonState } from "./validate.js"

export function openProfilePopup(popup){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
}

export function changeUserData(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    closePopup(popupProfile);
}

export function forSubmitImgHandler(evt) {
    evt.preventDefault();
    const placeInputValue = placeInput.value;
    const linkInputValue = linkInput.value;
    const inputList = Array.from(popupAddNewCard.querySelectorAll('.popup__input'));
    const submitButton = popupAddNewCard.querySelector('.popup__button');
    renderCard(placeInputValue, linkInputValue);
    formPopupFullSizeImage.reset();
    toggleButtonState(inputList, submitButton, settingsForValidation);
    closePopup(popupAddNewCard);
}