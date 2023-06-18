const validateMassage = (reg, value, min, max) => {
  let err = [];
  if (value.length < min) {
    err = [...err, "To short"];
  }
  if (value.length > max) {
    err = [...err, "To long"];
  }
  if (!reg.test(value)) {
    err = [...err, "invalid"];
  }
  return err;
};

export default validateMassage;
