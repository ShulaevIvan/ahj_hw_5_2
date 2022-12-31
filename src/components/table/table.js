import Popup from "../popup/popup";

export default class TableCrud {
    constructor(goodsSelector) {
        this.goods = document.querySelector(goodsSelector);
        this.addBtn = document.querySelector('.add-icon');
        this.popup = new Popup('.popup');
        this.allRows = [];

        this.addBtn.addEventListener('click', (e) => {
            this.popup.show();
        });

    }

    createRow(name, price, rowId) {
        this.row = document.createElement('div');
        this.name = document.createElement('div');
        this.price = document.createElement('div');
        this.control = document.createElement('div');
        this.removeBtn = document.createElement('span');
        this.editBtn = document.createElement('span');
        this.name.textContent = name;
        this.price.textContent = price;
        this.name.classList.add('name');
        this.price.classList.add('price');
        this.control.classList.add('controlBlock');
        this.editBtn.classList.add('edit-icon');
        this.removeBtn.classList.add('cross-icon');
        this.row.classList.add('table-row');
        this.row.setAttribute('rowId', rowId);
        this.removeBtn.setAttribute('rowId', rowId);
        this.editBtn.setAttribute('rowId', rowId);
        this.control.appendChild(this.editBtn);
        this.control.appendChild(this.removeBtn);
        this.row.appendChild(this.name);
        this.row.appendChild(this.price);
        this.row.appendChild(this.control);

        return this.row
    }

    addRow(name, price) {
        const edit = document.querySelector('.popup').getAttribute('popupid');
        const checkRow = this.allRows.find((item) => item.id == edit);
        let rowId = undefined;
        checkRow == undefined ? rowId = performance.now().toFixed() : rowId = checkRow.id
        this.row = this.createRow(name, price, rowId);

        if (checkRow == undefined) {
            this.allRows.push({
                id: rowId,
                name: name,
                price: Number(price),
                tag: this.row,
            });
        }
        else {
            const editRow = this.allRows.find((item) => item.id == rowId);
            this.allRows = this.allRows.filter((item) => item.id != rowId);
            editRow.tag.querySelector('.name').textContent = name;
            editRow.tag.querySelector('.price').textContent = price;
            this.allRows.push({
                id: rowId,
                name: name,
                price: Number(price),
                tag: editRow.tag
            });
        }

        this.renderRow()

        this.removeBtn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('rowId');
            this.removeRow(id)
        });

        this.editBtn.addEventListener('click', (e) =>  {
            this.editRow(e.target)
        });
    }

    renderRow() {
        const currentRows = Array.from(document.querySelectorAll('.table-row'));
        if (currentRows.length > 0)  {
            currentRows.forEach((item) => {
                item.remove();
            });
        }
        this.allRows.forEach((item) => {
         this.goods.appendChild(item.tag)
        });
    }


    removeRow(id) {
        Array.from(document.querySelectorAll('.table-row')).forEach((item) => {
            item.remove();
        });

        this.allRows = this.allRows.filter((item) => item.id != id);
        this.allRows.forEach((item) => {
            this.goods.appendChild(item.tag);
        });
    }

    editRow(target) {
        const targetId = target.getAttribute('rowId');
        const popup = new Popup('.popup', targetId);
        const targetObj = this.allRows.find((item) => item.id == targetId);
        const name = targetObj.tag.querySelector('.name').textContent;
        const price = targetObj.tag.querySelector('.price').textContent;
        const popUp = document.querySelector('#popup');
        const popUpName = popUp.querySelector('#name');
        const popUpPrice = popUp.querySelector('#price');
        popUpName.value = name;
        popUpPrice.value = price;
        popup.show();
    }
}