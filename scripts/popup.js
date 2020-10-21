export function openPopup(popup) {
    popup.classList.add('popup-state_opened');
    document.addEventListener('keydown', escCallback);
    popup.addEventListener('click', overlayClickCallback);
}

export function closePopup(popup) {
    popup.classList.remove('popup-state_opened');
    document.removeEventListener('keydown', escCallback);
    popup.removeEventListener('click', overlayClickCallback);

}

export function escCallback(event) {   
    if (event.key !== "Escape") {
        return
    };

    const openedPopup = document.querySelector('.popup-state_opened')
    closePopup(openedPopup);
}

export function overlayClickCallback(event) {    
    const openedPopup = event.target.closest('.popup-state_opened')
    if (event.target === openedPopup) {
        closePopup(openedPopup);
    }
}