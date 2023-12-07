class Products {
    
    displayCars(cars) {
        let allCars = '';

        cars.forEach(car => {
            allCars += `
                <div class="products-element">
                    <img class="products-element__img" src="${IMAGE_URL}"
                    <p>${car.mark}</p>
                    <p>${car.model}</p>
                    <p>${car.color}</p>
                    <div class="products-element_button-container">
                        <button class="products-element__btn">Добавить в корзину</button>
                        <div class="products-element_operations">
                            <button class="products-element_operations__btn">Edit</button>
                            <button class="products-element_operations__btn">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const htlm = `
            <div class="products-container">
                ${allCars}
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = htlm;
    }

    render() {
        

        fetch('http://localhost:5012/api/cars')
        .then(data => data.json())
        .then(response => this.displayCars(response));
    }

    
}

window.location.replace("components/Account/Account.html")
const productsPage = new Products();
productsPage.render();