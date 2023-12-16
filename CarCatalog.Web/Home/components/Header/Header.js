class Header {

    async handlerLogout() {
        await fetch(`${API_URL_ACCOUNT_LOGOUT}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });

        webSocketUtils.close();
        window.location.replace(`${URL_ACCOUNT}`);
    }

    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    async renderUserLink() {
        const isAdmin = await this.isUserAdmin()

        if (!isAdmin) 
            return '';

        const html = `
            <a onclick="usersPage.render();" class="nav__link">Users</a>
            <a onclick="notificationsPage.render();" class="nav__link">Notifications</a>
        `;
        return html;
    }

    async isUserAdmin() {
        const responseBody = await fetch(`${API_URL_ACCOUNT_ISADMIN}`, {
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

    async render() {
        const html = `
            <div class="header-container">
                <a onclick="productsPage.render();" class="nav__link" data-link>Home</a>
                ${await this.renderUserLink()}
                <a class="nav__link" onclick="headerPage.handlerLogout();">Logout</a>
                <a class="nav__link nav__link-icon" onclick="headerPage.handlerOpenShoppingPage();">
                    <div id="header_basket" class="header__basket"></div>
                </a>
            </div>
        `;

        ROOT_HEADER.innerHTML = html;

        await localStorageUserUtil.initUserId();
        localStorageProductUtil.keyName = `products basket user №${localStorageUserUtil.getUserId()}`;

        const products = localStorageProductUtil.getProducts();
        this.renderBasket(products.length);
    }

    renderBasket(countProducts) {
        let html = '';
        const basket = ROOT_HEADER_BASKET();
        if (countProducts === 0) {
            basket.innerHTML = html;
            return;
        }

        html = `
            <div class="nav__link_circle">${countProducts}</div>
            <svg class="nav__link-icon-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M.75-.02a.75.75 0 100 1.5l.408-.006 1.606 1.281 1.839 6.881L4.237 12a2 2 0 102.188 2.722l5.705.028a2 2 0 100-1.5l-5.705-.028a2.007 2.007 0 00-.722-.898l.438-2.632 7.933.027 1.91-7.715H4.227L1.683-.026 1.68-.02v-.005L.75-.02z" fill="#000"></path>
            </svg>
        `;

        basket.innerHTML = html;
    }
}

const headerPage = new Header();
