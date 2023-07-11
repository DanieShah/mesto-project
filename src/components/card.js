import { popupFullSizeImage } from "./modal";
import { downloadingCardsFromServer, deleteCardsFromServer, purLikeOnCard, deleteLikeOnCard } from './api';

export const elementsContainer = document.querySelector('.elements');
export const bigImage = document.querySelector('.popup__image');
export const titlePopupFullSizeImage = document.querySelector('.popup__signa');


export function addElements(nameElement, linkElement) {
    const elementTemplate = document.querySelector('#element').content;
    const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
    const trashButton =  elementContainer.querySelector('.element__trash');
    const likeButton = elementContainer.querySelector('.element__like');
    const profName = document.querySelector('.profile__name');
    elementContainer.querySelector('.element__img').src = linkElement;
    elementContainer.querySelector('.element__img').alt = nameElement;
    elementContainer.querySelector('.element__text').textContent = nameElement;


    // Удаляем карточку

    trashButton.addEventListener('click',() => {
        deleteCardFromSite(elementContainer);
    });

    // Добавляем лайки

    likeButton.addEventListener('click', () => {
         putAndDeletLikeOnSite(likeButton);
    });

    // Проверяем наличие пользовательского лайка на карточке

    // cheackingUserLikeOnCard(data, name);


    /* Открываем изображение */
    const smallImage = elementContainer.querySelector('.element__img');
    const elSigma = elementContainer.querySelector('.element__text');
    
    function openFullSizeImage() {
      bigImage.src = smallImage.src;
      bigImage.alt = elSigma.textContent;
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

// export function loadingCardsFromServer() {
//     downloadingCardsFromServer()
//     .then((data) => {
//         data.forEach((el) => {
//             renderCard(el.name, el.link);
//             const elementContainer = document.querySelector('.element');
//             const numberOfLikes = elementContainer.querySelector('.element__like-quantity');
//             const trashButton =  elementContainer.querySelector('.element__trash');
//             const likeButton = elementContainer.querySelector('.element__like');
//             const id = el._id;

//             numberOfLikes.textContent = el.likes.length;

//             if (el.owner._id !== myId.id) {
//                 trashButton.remove();
//             }

//             trashButton.addEventListener('click',() => {
//                 deleteCardsFromServer(id);
//             });

//             likeButton.addEventListener('click', () => {
//                 putAndDeletLikeOnServer(likeButton, numberOfLikes, id);
//             });

//             // if (el.likes.length > '0') {
//             //  el.likes.forEach((evt) => {
//             //     if (evt.name === profName.textContent) {
//             //         likeButton.classList.add('element__like_active');
//             //        }
//             //     });
//             // } 

//         });
//       });
// }

export function putAndDeletLikeOnSite(likeButton) {
    if (likeButton.classList.contains('element__like_active')) {
        likeButton.classList.remove('element__like_active');
    } else {
        likeButton.classList.add('element__like_active');
    }
}

export function deleteCardFromSite(elementContainer) {
    elementContainer.remove();
}

export function putAndDeletLikeOnServer(likeButton, numberOfLikes, id) {
    if (!   likeButton.classList.contains('element__like_active')) {
        deleteLikeOnCard(id)
        .then(data => {
            numberOfLikes.textContent = data.likes.length; 
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        purLikeOnCard(id)
        .then(data => {
            numberOfLikes.textContent = data.likes.length; 
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

export function cheackingUserLikeOnCard(el, name, likeButton) {
    if (el.likes.length > '0') {
        el.likes.forEach((evt) => {
           if (evt.name === name.textContent) {
               likeButton.classList.add('element__like_active');
              }
           });
       } 
}

  

import { openPopup, closePopup } from "./utils";