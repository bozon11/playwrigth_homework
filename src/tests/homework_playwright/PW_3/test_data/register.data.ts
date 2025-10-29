interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage: string;
}

const validTestData: IUserData[] = [
  {
    title: "Empty username",
    credentials: { username: "", password: "Validpass1" },
    successMessage: "Username is required",
  },
  {
    title: "Username contains only spaces",
    credentials: { username: "   ", password: "ValidPass123" },
    successMessage: "Username is required",
  },
  {
    title: "Username less than 3 characters",
    credentials: { username: "ab", password: "Validpass1" },
    successMessage: "Username should contain at least 3 characters",
  },
  {
    title: "Username has prefix spaces",
    credentials: { username: "  user", password: "Validpass1" },
    successMessage: "Prefix and postfix spaces are not allowed is username",
  },
  {
    title: "Username has postfix spaces",
    credentials: { username: "user  ", password: "Validpass1" },
    successMessage: "Prefix and postfix spaces are not allowed is username",
  },
  {
    title: "Username longer than 40 characters",
    credentials: { username: "a".repeat(41), password: "Validpass1" },
    successMessage: "Username can't exceed 40 characters",
  },
  {
    title: "Empty password",
    credentials: { username: "ValidUser", password: "" },
    successMessage: "Password is required",
  },
  {
    title: "Password contains only spaces",
    credentials: { username: "validUser", password: "   " },
    successMessage: "Password is required",
  },
  {
    title: "Password shorter than 8 characters",
    credentials: { username: "ValidUser", password: "Abc12" },
    successMessage: "Password should contain at least 8 characters",
  },
  {
    title: "Password all uppercase",
    credentials: { username: "ValidUser", password: "PASSWORD123" },
    successMessage: "Password should contain at least one character in lower case",
  },
  {
    title: "Password longer than 20 characters",
    credentials: { username: "ValidUser", password: "a" + "A".repeat(20) },
    successMessage: "Password can't exceed 20 characters",
  },
  {
    title: "Password should contain at least one character in upper case",
    credentials: { username: "ValidUser", password: "invalidpass1" },
    successMessage: "Password should contain at least one character in upper case",
  },
  {
    title: "Both username and password invalid (empty)",
    credentials: { username: "", password: "" },
    successMessage: "Please, provide valid data",
  },
  {
    title: "Username and Password contains only spaces",
    credentials: { username: "   ", password: "   " },
    successMessage: "Credentials are required",
  },
];

export default validTestData;
