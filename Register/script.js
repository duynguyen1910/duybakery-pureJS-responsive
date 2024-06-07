const usernameEle = document.querySelector("#username");
const errorToasterUsername = document.querySelector("#errorToasterUsername");
const errorTextUsername = document.querySelector("#errorTextUsername");

const fullname = document.querySelector("#fullname");
const errorToasterFullname = document.querySelector("#errorToasterFullname");
const errorTextFullname = document.querySelector("#errorTextFullname");

const gender = document.getElementById("gender");
const errorToasterGender = document.querySelector("#errorToasterGender");
const errorTextGenter = document.querySelector("#errorTextGenter");

const password = document.querySelector("#password");
const errorToasterPassword = document.querySelector("#errorToasterPassword");
const errorTextPassword = document.querySelector("#errorTextPassword");

const rePassword = document.querySelector("#rePassword");
const errorToasterRePassword = document.querySelector("#errorToasterRePassword");
const errorTextRePassword = document.querySelector("#errorTextRePassword");

const eyePassword = document.querySelector("#eyePassword");
const eyeSlashPassword = document.querySelector("#eyeSlashPassword");

const eyeRePassword = document.querySelector("#eyeRePassword");
const eyeSlashRePassword = document.querySelector("#eyeSlashRePassword");

usernameEle.addEventListener('input', function (e) {
    const newValue = e.target.value;

    if (newValue) {
        errorToasterUsername.style.display = "none";
        usernameEle.style.border = "2px solid #ff6924";
    } else {
        errorToasterUsername.style.display = "block";
        errorTextUsername.innerHTML = "Vui lòng nhập thông tin";
        usernameEle.style.border = "2px solid #b3261e"
    }
});


fullname.addEventListener('input', function (e) {
    const newValue = e.target.value;

    if (newValue) {
        errorToasterFullname.style.display = "none";
        fullname.style.border = "2px solid #ff6924";
    } else {
        errorToasterFullname.style.display = "block";
        errorTextFullname.innerHTML = "Vui lòng nhập thông tin";
        fullname.style.border = "2px solid #b3261e"
    }
});

password.addEventListener('input', function (e) {
    const newValue = e.target.value;

    if (newValue) {
        errorToasterPassword.style.display = "none";
        password.style.border = "2px solid #ff6924";
    } else {
        errorToasterPassword.style.display = "block";
        errorTextPassword.innerHTML = "Vui lòng nhập thông tin";
        password.style.border = "2px solid #b3261e"
    }
});

rePassword.addEventListener('input', function (e) {
    const newValue = e.target.value;

    if (newValue) {
        errorToasterRePassword.style.display = "none";
        rePassword.style.border = "2px solid #ff6924";
    } else {
        errorToasterRePassword.style.display = "block";
        errorTextRePassword.innerHTML = "Vui lòng nhập thông tin";
        rePassword.style.border = "2px solid #b3261e"
    }
});



const onRegister = () => {
    if (!regexPhoneNumber(usernameEle.value)) {
        errorToasterUsername.style.display = "block";
        errorTextUsername.innerHTML = "Số điện thoại không đúng định dạng";
        usernameEle.style.border = "2px solid #b3261e";
    }

    if (fullname.value.length < 3) {
        errorToasterFullname.style.display = "block";
        errorTextFullname.innerHTML = "Tên phải ít nhất 2 ký tự";
        fullname.style.border = "2px solid #b3261e";
    }

    if (!regexPassword(password.value)) {
        errorToasterPassword.style.display = "block";
        errorTextPassword.innerHTML = "Mật khẩu phải chứa ít nhất 1 chữ in hoa, thường, số và 8 ký tự";
        password.style.border = "2px solid #b3261e";
    }

    if (password.value !== rePassword.value) {
        errorToasterRePassword.style.display = "block";
        errorTextRePassword.innerHTML = "Mật khẩu không khớp";
        rePassword.style.border = "2px solid #b3261e";

        return;
    }

    if (usernameEle.value && fullname.value && gender.value && password.value && rePassword.value) {
        const listUser = getLocalStorage(LIST_USER) || [];
        const latestUser = listUser[listUser.length - 1];

        if (latestUser?.id) User.currentId = latestUser?.id;
        if (listUser.find(user => user.username === usernameEle.value)) {
            errorToasterUsername.style.display = "block";
            errorTextUsername.innerHTML = "Số điện thoại đã có người đăng ký";
            usernameEle.style.border = "2px solid #b3261e"

            return;
        }

        // upper case fullname
        let capitalized = '';
        capitalized += fullname?.value[0].toUpperCase();

        for (let i = 1; i < fullname.value.length; i++) {
            if (fullname.value[i - 1] === ' ') {
                capitalized += fullname.value[i].toUpperCase();
            } else {
                capitalized += fullname.value[i];
            }
        }

        const newUser = new User(usernameEle.value, capitalized, rePassword.value, []);

        listUser.push(newUser);
        setLocalStorage(LIST_USER, listUser);

        redirectPage("Login");
    };
}


const onClosePassword = () => {
    password.type = "password";
    eyeSlashPassword.style.display = 'none';
    eyePassword.style.display = 'block';
}

const onShowPassword = () => {
    password.type = "text";
    eyePassword.style.display = 'none';
    eyeSlashPassword.style.display = 'block';
}


const onCloseRePassword = () => {
    rePassword.type = "password";
    eyeSlashRePassword.style.display = 'none';
    eyeRePassword.style.display = 'block';
}

const onShowRePassword = () => {
    rePassword.type = "text";
    eyeRePassword.style.display = 'none';
    eyeSlashRePassword.style.display = 'block';
}
