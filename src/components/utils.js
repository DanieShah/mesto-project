export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closingPopupByPressingEscButton);
    popup.addEventListener('click', closingPopupByClickOnOverlay);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closingPopupByPressingEscButton);
    popup.removeEventListener('click', closingPopupByClickOnOverlay);
};

function closingPopupByPressingEscButton (evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
        popup.removeEventListener('click', closingPopupByClickOnOverlay);
        document.removeEventListener('keydown', closingPopupByPressingEscButton);
    }
};

function closingPopupByClickOnOverlay (evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.currentTarget === evt.target) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
        popup.removeEventListener('click', closingPopupByClickOnOverlay);
        document.removeEventListener('keydown', closingPopupByPressingEscButton);
    }
};