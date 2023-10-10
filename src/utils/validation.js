export const validateRegister = ({setErrMsg, email, password, username}) => {
    console.log('validation is doing');
    if (email === "" || password === "" || username === "") {
        setErrMsg("All fields are required.");
        return false;
    }
    if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrMsg("Invalid email address.");
        return false;
    }
    if (password.length < 4) {
        setErrMsg("Password strength is at least 4");
        return false;
    }

    return true;
}
export const validateLogin = ({setErrMsg, password, username}) => {
    console.log('validation is doing');
    if ( password === "" || username === "" ) {
        setErrMsg("All fields are required.");
        return false;
    }
    if (password.length < 4) {
        setErrMsg("Password strength is at least 4");
        return false;
    }

    return true;
}
