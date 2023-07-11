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
    }
};

function closingPopupByClickOnOverlay (evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target);
    }
};

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}