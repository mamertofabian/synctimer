import bcrypt from "bcryptjs";

const users = [
  {
    name: "Jun",
    email: "atomrem@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mannix",
    email: "mannixdonesarayata@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
