class Product {
    id;
    name;
    image;
    quantity;
    price;
    totalPrice;

    constructor(id, name, image, quantity, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = this.price * this.quantity;
    }

    setProductId(id) {
        this.id = id;
    }

    getProductId() {
        return this.id;
    }

    setProductName(name) {
        this.name = name;
    }

    getProductName() {
        return this.name;
    }

    setImage(image) {
        this.images = image;
    }

    getImage() {
        return this.images;
    }


    setQuantity(quantity) {
        this.quantity = quantity;
    }

    getQuantity() {
        return this.quantity;
    }

    setPrice(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    setTotalPrice() {
        this.totalPrice = this.price * this.quantity;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

}