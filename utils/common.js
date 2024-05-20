const setLocalStorage = (storageKey, value) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
}

const getLocalStorage = (storageKey) => {
    return JSON.parse(localStorage.getItem(storageKey));
}

const redirectPage = (url) => {
    window.location.replace(window.location.protocol + "//" +
        window.location.host + '/' + url + '/index.html');
}


const formatVND = (money) => {
    if (money) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    }
}