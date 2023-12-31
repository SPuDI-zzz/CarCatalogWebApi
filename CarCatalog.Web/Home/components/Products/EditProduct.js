class EditProduct {

    handlerClear() {
        ROOT_EDIT_PRODUCT.innerHTML = '';
    }

    async handlerEditProduct(carId) {
        const carMarkInput = document.getElementById("carMarkInput");
        const carModelInput = document.getElementById("carModelInput");
        const carColorInput = document.getElementById("carColorInput");

        const body = {
            mark: carMarkInput.value,
            model: carModelInput.value,
            color: carColorInput.value,
            userId: localStorageUserUtil.getNumberUserId()
        };

        await this.sendEditProduct(carId, body);
        this.handlerClear();
        productsPage.render();
    }

    async sendEditProduct(id, body) {
        await fetch(`${API_URL_CARS}/${id}`, {
            method: "PUT",
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
            return response
        });
    }

    displayCar(car) {
        const carContent = `
            <div class="form-container">
                <form>
                    <div class="form-container-edit-field">
                        <input class="form-container-edit__input" id="carMarkInput" type="text" placeholder="Марка" value="${car.mark}" />
                    </div>
                    <div class="form-container-edit-field">
                        <input class="form-container-edit__input" id="carModelInput" type="text" placeholder="Модель" value="${car.model}" />
                    </div>
                    <div class="form-container-edit-field">
                        <input class="form-container-edit__input" id="carColorInput" type="text" placeholder="Цвет" value="${car.color}" />
                    </div>
                    <button class="form-container-edit__btn" onclick="editProductPage.handlerEditProduct(${car.id});" type="button">Изменить</button>
                </form>
            </div>
        `;

        const html = `
            <div class="edit-product-container">
                <div class="edit-product__close" onclick="editProductPage.handlerClear();"></div>
                ${carContent}
            </div>
        `;

        ROOT_EDIT_PRODUCT.innerHTML = html;
    }

    render(id) {
        fetch(`${API_URL_CARS}/${id}`, {
            method: "GET",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(URL_ACCOUNT)
            return response.json()
        })
        .then(response => this.displayCar(response));
    }
}

const editProductPage = new EditProduct()
