import Popup from '../components/popup/popup';
import TableCrud from '../components/table/table';

window.addEventListener('DOMContentLoaded', () => {

    const saveBtn = document.querySelector('.popup__button_save');
    const cancelBtn = document.querySelector('.popup__button_cancel');
    const popup = new Popup('.popup');
    const controller = new TableCrud('.goods');


    saveBtn.addEventListener('click', (e) => {
        const name = document.querySelector('#name');
        const price = document.querySelector('#price');
        const validateName = popup.validateName(name)
        const validatePrice = popup.validatePrice(price)

        if (validateName && validatePrice) {
            controller.addRow(validateName, validatePrice);
            popup.hide();
        }

    });

    cancelBtn.addEventListener('click', (e) => {
        popup.hide();
    });


});