const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateUsername = (username) => {
  return username?.trim() && username?.trim().length > 3;
};

const validatePassword = (password) => {
  return password?.trim() && password?.trim().length > 3;
};


module.exports = {
    validateEmail,
    validateUsername,
    validatePassword
};