const verifyNewUserData = ({
  displayName,
  email,
  emailConf,
  password,
  passwordConf,
}) => {
  let isValid = true;
  const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (displayName === "") {
    document.getElementById("displayName").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("displayName").style.border = null;
  }

  if (email === "") {
    document.getElementById("email").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("email").style.border = null;
  }

  if (!emailTest.test(email.toLowerCase())) {
    document.getElementById("email").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("email").style.border = null;
  }

  if (emailConf === "") {
    document.getElementById("emailConf").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("emailConf").style.border = null;
  }

  if (password === "") {
    document.getElementById("password").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("password").style.border = null;
  }

  if (passwordConf === "") {
    document.getElementById("passwordConf").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("passwordConf").style.border = null;
  }

  if (email !== emailConf) {
    document.getElementById("email").style.border = "2px solid red";
    document.getElementById("emailConf").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("email").style.border = null;
    document.getElementById("emailConf").style.border = null;
  }

  if (password !== passwordConf) {
    document.getElementById("password").style.border = "2px solid red";
    document.getElementById("passwordConf").style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById("password").style.border = null;
    document.getElementById("passwordConf").style.border = null;
  }

  return isValid;
};

export default verifyNewUserData;
