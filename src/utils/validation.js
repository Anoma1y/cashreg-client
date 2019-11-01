import validator from 'validator';

const passwordReg = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g);

export const validationError = {
  email: (v) => validator.isEmail(v),
  password: (v, min = 6, max = 10) => validator.isLength(v, { min, max })
};

export const validationWarning = {
  password: (v) => passwordReg.test(v)
};

export const errorValidator = (name, value) => name in validationError ? validationError[name](value) : true;

export const warningValidator = (name, value) => name in validationWarning ? validationWarning[name](value) : true;
