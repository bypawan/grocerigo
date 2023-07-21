export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  const isValidPassword = passwordRegex.test(password);

  return isValidPassword ? true : false;
};
