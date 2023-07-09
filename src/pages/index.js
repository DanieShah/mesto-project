import './index.css';
import { avatar, popupAvatar, popupAvatarForm, openAvatarProfile, buttonCloseAvatarPopup, forSubmitAvatarHandler, loadingPageWithUpdateProfileData, popupProfile, popupProfileForm, editButton, buttonClosePopupProfile, openProfilePopup, changeUserData, popupAddNewCard, editImgButton, buttonClosePopupFullSizeImage, forSubmitImgHandler, closeFullSizeButton, formPopupFullSizeImage, popupFullSizeImage, popupBox} from '../components/modal.js';
import { loadingCardsFromServer, initialCards, loadingCardsFromSever } from '../components/card.js';
import { openPopup, closePopup} from '../components/utils.js';
import { enableValidation } from '../components/validate.js';
import { config, endingTheProfile, downloadingUserInformationFromServer, downloadingCardsFromServer, deleteCardsFromServer } from '../components/api.js';

popupProfileForm.addEventListener('submit', changeUserData);

editButton.addEventListener('click', () => openProfilePopup(popupProfile));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));


editImgButton.addEventListener('click', () => openPopup(popupAddNewCard));
buttonClosePopupFullSizeImage.addEventListener('click', () => closePopup(popupAddNewCard));

formPopupFullSizeImage.addEventListener('submit', forSubmitImgHandler);
closeFullSizeButton.addEventListener('click', () => closePopup(popupFullSizeImage));

avatar.addEventListener('click', () => openAvatarProfile(popupAvatar));
popupAvatarForm.addEventListener('submit', forSubmitAvatarHandler);
buttonCloseAvatarPopup.addEventListener('click', () => closePopup(popupAvatar));

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 

  loadingCardsFromServer();
  loadingPageWithUpdateProfileData();