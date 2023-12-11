// import { ROOT_PRODUCTS } from "../../constants/root.js"

class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    handlerSetLocationStorage(element, id) {
        const isPushProducts = localStorageUtil.putProduct(id);

        if (isPushProducts) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
            headerPage.render(localStorageUtil.count);
            return;
        }

        element.classList.remove(this.classNameActive);
        element.innerHTML = this.labelAdd;

        headerPage.render(localStorageUtil.count);
    }

    handlerEditProductPage(id) {
        editProductPage.render(id);
    }

    displayCars(cars) {
        const productsStore = localStorageUtil.getProducts();
        let allCars = '';

        cars.forEach(car => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(car.id) === -1) {
                activeText = this.labelAdd;
            }
            else {
                activeClass = this.classNameActive;
                activeText = this.labelRemove;
            }

            allCars += `
                <div class="products-element">
                    <img class="products-element__img" src="${IMAGE_URL}"
                    <p>${car.mark}</p>
                    <p>${car.model}</p>
                    <p>${car.color}</p>
                    <div class="products-element_button-container">
                        <button class="products-element__btn ${activeClass}" onclick="productsPage.handlerSetLocationStorage(this, ${car.id});">
                            ${activeText}
                        </button>
                        <div class="products-element_operations">
                            <button class="products-element_operations__btn" onclick="productsPage.handlerEditProductPage(${car.id});">Edit</button>
                            <button class="products-element_operations__btn">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const htlm = `
            <div class="products_body-container">
                <button class="products__btn-add products-element__btn">Add</button>
                <div class="products-container">
                    ${allCars}
                </div>
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = htlm;
        headerPage.render(localStorageUtil.count);
    }

    render() {
        fetch(`${API_URL}/cars`, {
            method: "GET",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace("http://127.0.0.1:5500/Account")
            return response.json() })
        .then(response => this.displayCars(response))
    }

    
}

const productsPage = new Products();
productsPage.render();