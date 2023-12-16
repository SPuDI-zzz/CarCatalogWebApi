class AddUser {
    constructor() {
        this.expanded = false;
    }

    handlerClear() {
        ROOT_ADD_PRODUCT.innerHTML = '';
    }

    async handlerAddUser() {
        const loginInput = document.getElementById("loginInput");
        const passwordInput = document.getElementById("passwordInput");
        const checkboxesRole = document.querySelectorAll('.checkboxInput');

        let roles = [];
        for (let index = 0; index < checkboxesRole.length; index++) {
            const element = checkboxesRole[index];
            if (element.checked) {
                roles.push(parseInt(element.value))
            }
        }

        const body = {
            login: loginInput.value,
            password: passwordInput.value,
            roles: roles
        };

        await this.sendAddUser(body);
        this.handlerClear();
        usersPage.render();
    }

    async sendAddUser(body) {
        await fetch(`${API_URL_USERS}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })
        .then(async response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`);
            if (response.status === 400) {
                const responseBody = await response.json()
                const errorMessage = responseBody.errors.map(error => error.description).join(" ");
                alert(errorMessage);
            }
        });
    }

    showCheckboxes() {
        const checkboxes = document.getElementById("checkboxes");
        if (!this.expanded) {
            checkboxes.style.display = "block";
            this.expanded = true;
        } else {
            checkboxes.style.display = "none";
            this.expanded = false;
        }
    }

    displayUser() {
        const userContent = `
            <div class="form-container">
                <form>
                    <div class="form-container-add-field">
                        <input class="user-form-container__input" id="loginInput" type="text" placeholder="Логин" value="" />
                    </div>
                    <div class="form-container-add-field">
                        <input class="user-form-container__input" id="passwordInput" type="text" placeholder="Пароль" value="" />
                    </div>
                    <form>
                        <div class="multiselect">
                            <div class="selectBox" onclick="addUserPage.showCheckboxes()">
                                <select>
                                    <option>Выбрать роли</option>
                                </select>
                                <div class="overSelect"></div>
                            </div>
                            <div id="checkboxes">
                                <label for="one"><input checked type="checkbox" class="checkboxInput" value="1">User</label>
                                <label for="two"><input type="checkbox" class="checkboxInput" value="2">Manager</label>
                                <label for="three"><input type="checkbox" class="checkboxInput" value="3">Admin</label>
                            </div>
                        </div>
                    </form>
                    <button class="form-container-add__btn" onclick="addUserPage.handlerAddUser();" type="button">Добавить</button>
                </form>
            </div>
        `;

        const html = `
            <div class="add-product-container">
                <div class="add-product__close" onclick="addProductPage.handlerClear();"></div>
                ${userContent}
            </div>
        `;

        ROOT_ADD_PRODUCT.innerHTML = html;
    }

    render() {
        this.displayUser();
    }
}

const addUserPage = new AddUser()
