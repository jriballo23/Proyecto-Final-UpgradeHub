const validationPassword = (password) => {
    const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,20}$/;
    return response.test(String(password));
}

const validationEmail = (email) => {
    const response = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return response.test(String(email).toLocaleLowerCase());
}

module.exports = {
    validationPassword,
    validationEmail
}