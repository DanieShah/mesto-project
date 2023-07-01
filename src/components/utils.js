export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    popup.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closePopup(popup);
        }
    });
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};