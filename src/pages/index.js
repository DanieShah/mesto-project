import './index.css';
import { avatar, popupAvatar, popupAvatarForm, openAvatarProfile, buttonCloseAvatarPopup, forSubmitAvatarHandler, loadingPageWithUpdateProfileData, popupProfile, popupProfileForm, editButton, buttonClosePopupProfile, openProfilePopup, changeUserData, popupAddNewCard, editImgButton, buttonClosePopupFullSizeImage, forSubmitImgHandler, closeFullSizeButton, formPopupFullSizeImage, popupFullSizeImage, popupBox, profileName, profileJob, avatarImg} from '../components/modal.js';
import { loadingCardsFromServer, cheackingUserLikeOnCard, renderCard, initialCards, loadingCardsFromSever, putAndDeletLikeOnServer } from '../components/card.js';
import { openPopup, closePopup} from '../components/utils.js';
import { enableValidation } from '../components/validate.js';
import { config, endingTheProfile, downloadingUserInformationFromServer, downloadingCardsFromServer, deleteCardsFromServer } from '../components/api.js';
export let userId;


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

  // loadingCardsFromServer();
  // loadingPageWithUpdateProfileData();

  Promise.all([downloadingUserInformationFromServer(), downloadingCardsFromServer()])
  .then ((res) => {
    let userData = res[0];
    let cards = res[1];
    return [userData, cards]
  })
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarImg.src = userData.avatar;
    userId = userData._id;
    
    cards.forEach((el) => {
      renderCard(el.name, el.link);
      const elementContainer = document.querySelector('.element');
      const numberOfLikes = elementContainer.querySelector('.element__like-quantity');
      const trashButton =  elementContainer.querySelector('.element__trash');
      const likeButton = elementContainer.querySelector('.element__like');

      numberOfLikes.textContent = el.likes.length;

      if (el.owner._id !== userId) {
          trashButton.remove();
      }

      trashButton.addEventListener('click',() => {
        deleteCardsFromServer(el._id);
      });
  
      likeButton.addEventListener('click', () => {
        putAndDeletLikeOnServer(likeButton, numberOfLikes, el._id);
      });

      cheackingUserLikeOnCard(el, profileName, likeButton); 
    });
  })
  .catch((err) => {
    console.log(err);
  })