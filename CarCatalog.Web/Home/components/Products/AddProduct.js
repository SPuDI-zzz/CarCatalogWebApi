class AddProduct {

    handlerClear() {
        ROOT_ADD_PRODUCT.innerHTML = '';
    }

    async handlerAddProduct() {
        const carMarkInput = document.getElementById("carMarkInput");
        const carModelInput = document.getElementById("carModelInput");
        const carColorInput = document.getElementById("carColorInput");

        const body = {
            mark: carMarkInput.value,
            model: carModelInput.value,
            color: carColorInput.value,
            userId: localStorageUserUtil.getNumberUserId()
        };

        await this.sendAddProduct(body);
        this.handlerClear();
        productsPage.render();
    }

    async sendAddProduct( body) {
        await fetch(`${API_URL_CARS}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`);
            if (response.status === 404)
                alert("Такой машины нет");
            return response;
        });
    }

    displayCar() {
        const carContent = `
            <div class="form-container">
                <form>
                    <div class="add-product-element-field">
                        <input class="form-container-add__input" id="carMarkInput" type="text" placeholder="Марка" value="" />
                    </div>
                    <div class="add-product-element-field">
                        <input class="form-container-add__input" id="carModelInput" type="text" placeholder="Модель" value="" />
                    </div>
                    <div class="add-product-element-field">
                        <input class="form-container-add__input" id="carColorInput" type="text" placeholder="Цвет" value="" />
                    </div>
                    <button class="add-product-element__btn" onclick="addProductPage.handlerAddProduct();" type="button">Добавить</button>
                </form>
            </div>
        `;

        const html = `
            <div class="add-product-container">
                <div class="add-product__close" onclick="addProductPage.handlerClear();"></div>
                ${carContent}
            </div>
        `;

        ROOT_ADD_PRODUCT.innerHTML = html;
    }

    render() {
        this.displayCar();
    }
}

const addProductPage = new AddProduct()
