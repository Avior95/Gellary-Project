import validateMassage from "./validate.js";

const validateUrl = (value) => {
  const reg = new RegExp(
    "(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|ico)",
    "g"
  );

  return validateMassage(reg, value, 5, 255).map((err) => `Url is ${err}`);
};

export default validateUrl;
