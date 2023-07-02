function closingPopupByPressingEscButton (evt) {
    const popup = Array.from(document.querySelectorAll('.popup'));
    popup.forEach((element) => {
      if (evt.key === 'Escape') {
         closePopup(element);
      }
    });
    document.removeEventListener('keydown', closingPopupByPressingEscButton);
};

function closingPopupByClickOnOverlay (evt) {
    const popup = Array.from(document.querySelectorAll('.popup'));
    popup.forEach((element) => {
        if (evt.currentTarget === evt.target) {
            closePopup(element);
            element.removeEventListener('click', closingPopupByClickOnOverlay);
        }
    });
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closingPopupByPressingEscButton);
    popup.addEventListener('click', closingPopupByClickOnOverlay);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};