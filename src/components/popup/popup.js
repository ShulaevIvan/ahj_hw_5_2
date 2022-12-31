export default class Popup {
    constructor(popupSelector, popupId) {
        this.popup = document.querySelector(popupSelector);
        this.id = popupId;
        this.nameInput = popup.querySelector('#name');
        this.priceInput = popup.querySelector('#price');

        this.nameInput.addEventListener('blur', (e) => {
            this.validateName(this.nameInput)
         });

        this.priceInput.addEventListener('blur', (e) => {
           this.validatePrice(this.priceInput)
        });
    }

    validateName(name) {
        if (name.value.length <= 0 || !name.value.trim()) {
            name.classList.add('border-red');
        }
        else {
            name.classList.remove('border-red');
            return name.value
        }
    }
    
    validatePrice(price) {
        if (Number(price.value) <= 0 || isNaN(price.value)) {
            price.classList.add('border-red');
        }
        else {
            price.classList.remove('border-red');
            return price.value;
        }
    }

    show() {
        this.popup.classList.remove('popup_hidden');
        this.popup.setAttribute('popupId', this.id);
    }

    hide() {
        this.popup.classList.add('popup_hidden');
    }
}