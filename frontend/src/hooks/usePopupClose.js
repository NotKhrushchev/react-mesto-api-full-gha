import { useEffect } from "react"

// Хук закрытия попапа на оверлей и Esc
export const usePopupClose = (isOpen, closePopup) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleOverlay = (e) => {
            if (e.target.classList.contains('popup_opened')) {
                closePopup();
            }
        }

        const handleEscClick = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        }

        document.addEventListener('keydown', handleEscClick);
        document.addEventListener('mousedown', handleOverlay);

        return () => {
            document.removeEventListener('keydown', handleEscClick);
            document.removeEventListener('mousedown', handleOverlay);
        }
    }, [isOpen, closePopup])
}