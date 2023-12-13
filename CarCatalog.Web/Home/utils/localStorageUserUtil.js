class LocalStorageUserUtil {
    constructor() {
        this.keyName = 'userId'
    }

    async initUserId() {
        await fetch(`${API_URL_ACCOUNT_CLAIMS}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        })
        .then(async response => { 
            if (response.status === 401 || response.status === 403)
                window.location.replace(`${URL_ACCOUNT}`)
            return await response.json() 
        })
        .then(responseBody => localStorage.setItem(this.keyName, responseBody.userId));
    }

    removeUserId() {
        localStorage.removeItem(this.keyName);
    }

    getUserId() {
        const userId = localStorage.getItem(this.keyName);
        return userId;
    }

    getNumberUserId() {
        const userId = Number.parseInt(this.getUserId());
        if (Number.isNaN(userId))
            return 0;
        
        return userId;
    }
}

const localStorageUserUtil = new LocalStorageUserUtil();
