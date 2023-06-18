const checkIfBusiness = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  token = JSON.parse(token);
  return token.business;
};

export default checkIfBusiness;
