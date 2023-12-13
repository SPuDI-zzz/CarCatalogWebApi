class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    handlerSetLocationStorage(element, id) {
        const isPushProducts = localStorageProductUtil.putProduct(id);

        if (isPushProducts) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
            headerPage.renderBasket(localStorageProductUtil.count);
            return;
        }

        element.classList.remove(this.classNameActive);
        element.innerHTML = this.labelAdd;

        headerPage.renderBasket(localStorageProductUtil.count);
    }

    handlerAddProductPage() {
        editProductPage.handlerClear();
        addProductPage.render();
    }

    handlerEditProductPage(id) {
        addProductPage.handlerClear();
        editProductPage.render(id);
    }

    handlerDeleteProduct(id) {
        fetch(`${API_URL_CARS}/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403) 
                window.location.replace(`${URL_ACCOUNT}`);
            
            response.status === 404 ? 
                alert('Не получилось удалить машину') :
                alert(`Машина удалена`);

            localStorageProductUtil.removeIfContainsProduct(id);
            this.render();
        });        
    }

    async hasPermissions() {
        const userClaims = await this.getUserClaims();
        const userRoles = userClaims.userRoles;

        if (userRoles.find(role => role === 'Manager' || role === 'Admin')) 
            return true;
        
        return false;
    }

    async getUserClaims() {
        const responseBody = await fetch(`${API_URL_ACCOUNT_CLAIMS}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`)
            return response.json() 
        });

        return responseBody;
    }

    filterCars(cars, hasPermissions) {
        const markFilter = document.getElementById('markFilter').value;
        const colorFilter = document.getElementById('colorFilter').value;
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();

        const filteredCars = cars.filter(car =>
            (markFilter === '' || car.mark === markFilter) &&
            (colorFilter === '' || car.color === colorFilter) &&
            (nameFilter === '' || car.mark.toLowerCase().includes(nameFilter) || car.model.toLowerCase().includes(nameFilter))
        );

        this.displayCars(filteredCars, hasPermissions);
    }

    renderFilter(cars, hasPermissions = false) {
        let markSelect = document.createElement('select');
        let colorSelect = document.createElement('select');

        const brands = [...new Set(cars.map(car => car.mark))];
        const colors = [...new Set(cars.map(car => car.color))];

        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;

            markSelect.appendChild(option);
        });

        const marksOption = markSelect.innerHTML;

        colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colorSelect.appendChild(option);
        });
        
        const colorsOption = colorSelect.innerHTML;

        const buttonAdd = hasPermissions ? 
            '<button type="button" class="products__btn-add" onclick="productsPage.handlerAddProductPage();">Add</button>' :
            '';

        const html = `
            <div id="products_filter" class="products_filter">
                <select id="markFilter">
                    <option value="">Выберите марку</option>
                    ${marksOption}
                </select>
                <select id="colorFilter">
                    <option value="">Выберите цвет</option>
                    ${colorsOption}
                </select>
                <input id="nameFilter" type="text" placeholder="Поиск по наименованию">
                ${buttonAdd}
            </div>
            <div id="products_body"></div>
        `;

        ROOT_PRODUCTS.innerHTML = html;

        markSelect = document.getElementById('markFilter');
        colorSelect = document.getElementById('colorFilter');
        const nameInput = document.getElementById('nameFilter');

        markSelect.addEventListener('change', () => this.filterCars(cars, hasPermissions));
        colorSelect.addEventListener('change', () => this.filterCars(cars, hasPermissions));
        nameInput.addEventListener('input', () => this.filterCars(cars, hasPermissions));
    }

    displayCars(cars, hasPermissions = false) {
        const productsStore = localStorageProductUtil.getProducts();
        let allCars = '';

        cars.forEach(car => {
            let activeClass = '';
            let activeText = '';

            const operationButtons = hasPermissions ? `
                <div class="products-element_operations">
                    <button type="button" class="products-element_operations__btn" onclick="productsPage.handlerEditProductPage(${car.id});">Edit</button>
                    <button type="button" class="products-element_operations__btn" onclick="productsPage.handlerDeleteProduct(${car.id});">Delete</button>
                </div>
            ` :
            '';

            if (productsStore.indexOf(car.id) === -1) {
                activeText = this.labelAdd;
            }
            else {
                activeClass = this.classNameActive;
                activeText = this.labelRemove;
            }

            allCars += `
                <div class="products-element">
                    <img class="products-element__img" src="${IMAGE_CAR_URL}">
                    <p>${car.mark}</p>
                    <p>${car.model}</p>
                    <p>${car.color}</p>
                    <div class="products-element_button-container">
                        <button class="products-element__btn ${activeClass}" onclick="productsPage.handlerSetLocationStorage(this, ${car.id});">
                            ${activeText}
                        </button>
                        ${operationButtons}
                    </div>
                </div>
            `;
        });

        const htlm = `
            <div class="products-container">
                ${allCars}
            </div>
        `;

        ROOT_PRODUCTS_BODY().innerHTML = htlm;
    }

    render() {
        fetch(`${API_URL_CARS}`, {
            method: "GET",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`);
            return response.json();
        })
        .then(async (response) => {
            const hasPermissions = await this.hasPermissions();
            await headerPage.render();
            this.renderFilter(response, hasPermissions);
            this.displayCars(response, hasPermissions);
        });
    }
}

const productsPage = new Products();
productsPage.render();
