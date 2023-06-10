import * as bcrypt from 'bcrypt';


const hash = (password) => {

  const saltRounds = 10; // Number of salt rounds to generate

  return bcrypt.hashSync(password, saltRounds);

};

const verify = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);

};

export const AuthHelpers = {
  hash, verify,
};