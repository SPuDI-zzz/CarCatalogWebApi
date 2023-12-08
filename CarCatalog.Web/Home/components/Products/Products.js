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

    async render() {
        fetch(`${API_URL}/cars`,{
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