import { popupFullSizeImage } from "./modal";

export const elementsContainer = document.querySelector('.elements');
export const bigImage = document.querySelector('.popup__image');
export const titlePopupFullSizeImage = document.querySelector('.popup__signa');
export const initialCards = [
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

export function addElements(nameElement, linkElement) {
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
      titlePopupFullSizeImage.textContent = elSigma.textContent;
      openPopup(popupFullSizeImage);
    }
    
    smallImage.addEventListener('click', openFullSizeImage);
    return elementContainer;
}

export function renderCard(nameElement, linkElement) {
    elementsContainer.prepend(addElements(nameElement, linkElement));
  }
  

  import { openPopup, closePopup } from "./utils";