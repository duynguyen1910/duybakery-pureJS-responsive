const usernameEle = document.querySelector("#username");
const passwordEle = document.querySelector("#password");
const errorToaster = document.querySelector("#errorToaster");
const errorTextToaster = document.querySelector("#errorTextToaster");

const eyePassword = document.querySelector("#eyePassword");
const eyeSlashPassword = document.querySelector("#eyeSlashPassword");


usernameEle.addEventListener('input', function (e) {
    const newValue = e.target.value;

    if (newValue) {
        errorToaster.style.display = "none";
        usernameEle.style.border = "2px solid #ff6924";
    } else {
        errorToaster.style.display = "block";
        errorTextToaster.innerHTML = "Vui lòng nhập thông tin";
        usernameEle.style.border = "2px solid #b3261e"

    }
});

const onClosePassword = () => {
    passwordEle.type = "password";
    eyeSlashPassword.style.display = 'none';
    eyePassword.style.display = 'block';
}

const onShowPassword = () => {
    passwordEle.type = "text";
    eyePassword.style.display = 'none';
    eyeSlashPassword.style.display = 'block';
}


const onLogin = () => {
    if (!regexPhoneNumber(usernameEle.value)) {
        errorToaster.style.display = "block";
        errorTextToaster.innerHTML = "Số điện thoại không đúng định dạng";
        usernameEle.style.border = "2px solid #b3261e"
    }

    
    const listUser = getLocalStorage(LIST_USER) || [];

    if(!listUser.find((user) => user.username === usernameEle.value)) {
        errorToaster.style.display = "block";
        errorTextToaster.innerHTML = "Số điện thoại chưa được đăng ký";
        usernameEle.style.border = "2px solid #b3261e"

        return;
    }


    if(!listUser.find((user) => user.password === passwordEle.value)) {
        console.log("Mật khẩu không đúng!")
    }

    const currentUser = listUser.find((user) => user.username === usernameEle.value);

    setLocalStorage(USER_INFO, currentUser);
    redirectPage("Home");
}