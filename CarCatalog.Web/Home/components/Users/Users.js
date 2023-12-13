class Users {
    handlerAddUserPage() {
        addUserPage.render();
    }

    handlerEditUserPage(id) {
        editUserPage.render(id);
    }

    handlerDeleteUser(id) {
        fetch(`${API_URL_USERS}/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403) 
                window.location.replace(`${URL_ACCOUNT}`);
            
            response.status === 404 ? 
                alert('Не получилось удалить пользователя') :
                alert(`Пользователь удален`);

            this.render();
        });
    }

    displayUsers(users) {
        let allUsers = '';

        users.forEach(user => {
            allUsers += `
                <div class="products-element">
                    <img class="products-element__img" src="${IMAGE_USER_URL}">
                    <p>${user.login}</p>
                    <p>${user.roles.join(', ')}</p>
                    <div class="products-element_button-container">
                        <div class="products-element_operations">
                            <button type="button" class="users-element_operations__btn" onclick="usersPage.handlerAddUserPage();">Add</button>
                            <button type="button" class="users-element_operations__btn" onclick="usersPage.handlerEditUserPage(${user.id});">Edit</button>
                            <button type="button" class="users-element_operations__btn" onclick="usersPage.handlerDeleteUser(${user.id});">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const htlm = `
            <div class="products-container">
                ${allUsers}
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = htlm;
    }

    render() {
        editProductPage.handlerClear();
        addProductPage.handlerClear();
        fetch(`${API_URL_USERS}`, {
            method: "GET",
            credentials: 'include'
        })
        .then(response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`);
            return response.json();
        })
        .then(async (response) => {
            this.displayUsers(response);
        });
    }
}

const usersPage = new Users();
