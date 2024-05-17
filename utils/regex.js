const regexPhoneNumber = phone => {
    const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber);
}

const regexPassword = password => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return password.match(regexPassword);
}