import { popupFullSizeImage } from "./modal";
import { downloadingCardsFromServer, deleteCardsFromServer, purLikeOnCard, deleteLikeOnCard } from './api';

export const elementsContainer = document.querySelector('.elements');
export const bigImage = document.querySelector('.popup__image');
export const titlePopupFullSizeImage = document.querySelector('.popup__signa');
const myId = {
    id: '5bf29d6de13b33c334a28869'
}


export function addElements(nameElement, linkElement) {
    const elementTemplate = document.querySelector('#element').content;
    const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
    elementContainer.querySelector('.element__img').src = linkElement;
    elementContainer.querySelector('.element__text').textContent = nameElement;


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
    return Promise.resolve(elementsContainer);
}

export function loadingCardsFromServer() {
    downloadingCardsFromServer()
    .then((data) => {
        data.forEach((el) => {
            renderCard(el.name, el.link);
            const elementContainer = document.querySelector('.element');
            const numberOfLikes = elementContainer.querySelector('.element__like-quantity');
            const trashButton =  elementContainer.querySelector('.element__trash');
            const likeButton = elementContainer.querySelector('.element__like');
            const profName = document.querySelector('.profile__name');
            const id = el._id;

            numberOfLikes.textContent = el.likes.length;

            if (el.owner._id !== myId.id) {
                trashButton.remove();
            }

            // function deleteCardFromSite() {
            //     deleteCardsFromServer(el._id);
            //     elementContainer.remove();
            // }

            trashButton.addEventListener('click',() => {
                deleteCardFromSite(elementContainer, id);
            });

            // function putAndDeletLikeOnSite(evt) {
            //     if (evt.target.classList.contains('element__like_active')) {
            //         deleteLikeOnCard(el._id)
            //         .then(result => result.json())
            //         .then(data => {
            //             numberOfLikes.textContent = data.likes.length; 
            //         });
            //         evt.target.classList.remove('element__like_active');
            //     } else {
            //         purLikeOnCard(el._id)
            //         .then(result => result.json())
            //         .then(data => {
            //             numberOfLikes.textContent = data.likes.length; 
            //         });
            //         evt.target.classList.add('element__like_active');
            //     }
            // }

            likeButton.addEventListener('click', () => {
                putAndDeletLikeOnSite(likeButton, numberOfLikes, id);
            });

            if (el.likes.length > '0') {
             el.likes.forEach((evt) => {
                if (evt.name === profName.textContent) {
                    likeButton.classList.add('element__like_active');
                   }
                });
            } 

        });
      });
}

export function putAndDeletLikeOnSite(likeButton, numberOfLikes, id) {
    if (likeButton.classList.contains('element__like_active')) {
        deleteLikeOnCard(id)
        .then(result => result.json())
        .then(data => {
            numberOfLikes.textContent = data.likes.length; 
        });
        likeButton.classList.remove('element__like_active');
    } else {
        purLikeOnCard(id)
        .then(result => result.json())
        .then(data => {
            numberOfLikes.textContent = data.likes.length; 
        });
        likeButton.classList.add('element__like_active');
    }
}

export function deleteCardFromSite(elementContainer, id) {
    deleteCardsFromServer(id);
    elementContainer.remove();
}
  

import { openPopup, closePopup } from "./utils";