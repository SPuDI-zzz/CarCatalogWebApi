class EditUser {

    handlerClear() {
        ROOT_EDIT_PRODUCT.innerHTML = '';
    }

    async handlerEditUser(Id) {
        const loginInput = document.getElementById("loginInput");
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
            roles: roles
        };

        await this.sendEditUser(Id, body);
        this.handlerClear();
        usersPage.render();
    }

    async sendEditUser(id, body) {
        await fetch(`${API_URL_USERS}/${id}`, {
            method: "PUT",
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
                return;
            }

            if (response.status === 404) {
                alert('Такого пользователя нет');
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

    displayUser(user) {
        let roles = new Map(ROLES);

        user.roles.forEach(role => roles.set(role, 'checked'));

        const userContent = `
            <div class="form-container">
                <form>
                    <div class="edit-product-element-field">
                        <input class="user-form-container__input" id="loginInput" type="text" placeholder="Логин" value="${user.login}" />
                    </div>
                    <form>
                        <div class="multiselect">
                            <div class="selectBox" onclick="editUserPage.showCheckboxes()">
                                <select>
                                    <option>Выбрать роли</option>
                                </select>
                                <div class="overSelect"></div>
                            </div>
                            <div id="checkboxes">
                                <label for="one"><input id="one" type="checkbox" ${roles.get('User')} class="checkboxInput" value="1">User</label>
                                <label for="two"><input id="two" type="checkbox" ${roles.get('Manager')} class="checkboxInput" value="2">Manager</label>
                                <label for="three"><input id="three" type="checkbox" ${roles.get('Admin')} class="checkboxInput" value="3">Admin</label>
                            </div>
                        </div>
                    </form>
                    <button class="edit-product-element__btn" onclick="editUserPage.handlerEditUser(${user.id});" type="button">Добавить</button>
                </form>
            </div>
        `;

        const html = `
            <div class="edit-product-container">
                <div class="edit-product__close" onclick="editUserPage.handlerClear();"></div>
                ${userContent}
            </div>
        `;

        ROOT_EDIT_PRODUCT.innerHTML = html;
    }

    render(id) {
        fetch(`${API_URL_USERS}/${id}`, {
            method: "GET",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(URL_ACCOUNT)
            return response.json()
        })
        .then(response => this.displayUser(response));
    }
}

const editUserPage = new EditUser()
