// import { ROOT_HEADER } from "../../constants/root.js";

class Header {

    async handlerLogout() {
        await fetch(`${API_URL}/Account/Logout`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });

        window.location.replace("/Account");
    }

    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    render(countProducts) {
        const html = `
            <div class="header-container">
                <a href="/Home" class="nav__link" data-link>Home</a>
                <a href="/Home/Users" class="nav__link" data-link>Users</a>
                <a class="nav__link" onclick="headerPage.handlerLogout();">Logout</a>
                <a class="nav__link nav__link-icon" onclick="headerPage.handlerOpenShoppingPage();">
                    <div class="header__basket">
                        ${this.renderBasket(countProducts)}
                        <svg class="nav__link-icon-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M.75-.02a.75.75 0 100 1.5l.408-.006 1.606 1.281 1.839 6.881L4.237 12a2 2 0 102.188 2.722l5.705.028a2 2 0 100-1.5l-5.705-.028a2.007 2.007 0 00-.722-.898l.438-2.632 7.933.027 1.91-7.715H4.227L1.683-.026 1.68-.02v-.005L.75-.02z" fill="#000"></path>
                        </svg>
                    </div>
                </a>
            </div>

        `;

        ROOT_HEADER.innerHTML = html;
    }

    renderBasket(countProducts) {
        if (countProducts === 0)
            return '';

        const html = `
            <div id="countProducts" class="nav__link_circle">${countProducts}</div>
        `;

        return html
    }
}

const headerPage = new Header();
_ = localStorageUtil.getProducts();
headerPage.render(localStorageUtil.count);
