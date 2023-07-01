import './styles/index.css';
import { popupProfile, popupProfileForm, editButton, buttonClosePopupProfile, openProfilePopup, changeUserData, popupAddNewCard, editImgButton, buttonClosePopupFullSizeImage, forSubmitImgHandler, closeFullSizeButton, formPopupFullSizeImage, popupFullSizeImage, popupBox} from './components/modal.js';
import { initialCards, renderCard} from './components/card.js';
import { openPopup, closePopup} from './components/utils.js';
import { enableValidation } from './components/validate.js'

popupProfileForm.addEventListener('submit', changeUserData);

editButton.addEventListener('click', () => openProfilePopup(popupProfile));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));


editImgButton.addEventListener('click', () => openPopup(popupAddNewCard));
buttonClosePopupFullSizeImage.addEventListener('click', () => closePopup(popupAddNewCard));

renderCard(initialCards[5].name, initialCards[5].link);
renderCard(initialCards[4].name, initialCards[4].link);
renderCard(initialCards[3].name, initialCards[3].link);
renderCard(initialCards[2].name, initialCards[2].link);
renderCard(initialCards[1].name, initialCards[1].link);
renderCard(initialCards[0].name, initialCards[0].link);

formPopupFullSizeImage.addEventListener('submit', forSubmitImgHandler);
closeFullSizeButton.addEventListener('click', () => closePopup(popupFullSizeImage));

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 