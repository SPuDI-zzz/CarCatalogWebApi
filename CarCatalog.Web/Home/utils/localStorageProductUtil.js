class LocalStorageProductUtil {
    constructor() {
        this.count = 0;
        this.keyName = '';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            const products = JSON.parse(productsLocalStorage);
            this.count = products.length;
            return products;
        }

        this.count = 0;
        return [];
    }
    
    putProduct(id) {
        let products = this.getProducts();
        let isPushProducts = false;
        const index = products.indexOf(id);

        if (index === -1) {
            products.push(id);
            isPushProducts = true;
        }
        else {
            products.splice(index, 1);
        }
        
        localStorage.setItem(this.keyName, JSON.stringify(products));
        this.count = products.length;

        return isPushProducts;
    }

    removeIfContainsProduct(id) {
        let products = this.getProducts();
        const index = products.indexOf(id);

        if (index === -1) 
            return;
        
        products.splice(index, 1);
        this.count = products.length;
        localStorage.setItem(this.keyName, JSON.stringify(products));
    }
}

const localStorageProductUtil = new LocalStorageProductUtil();
