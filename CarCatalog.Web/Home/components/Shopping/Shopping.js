// import { ROOT_SHOPPING } from "../../constants/root.js"

class Shopping {

    handlerClear() {
        ROOT_SHOPPING.innerHTML = '';
    }

    displayCars(cars) {
        const productsStore = localStorageUtil.getProducts();
        let allCars = '';

        cars.forEach(car => {
            if (productsStore.indexOf(car.id) !== -1) {
                allCars += `
                    <tr>
                        <td>${car.mark}</td>
                        <td>${car.model}</td>
                        <td>${car.color}</td>
                    </tr>
                `;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping__close" onclick="shoppingPage.handlerClear();"></div>
                <table class="table">
                    <thead>
                        <tr>
                            <td>Марка</td>
                            <td>Модель</td>
                            <td>Цвет</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${allCars}
                    </tbody>
                </table>
            </div>
        `;

        ROOT_SHOPPING.innerHTML = html;
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

const shoppingPage = new Shopping();
