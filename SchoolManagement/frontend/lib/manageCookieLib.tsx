import Cookies from "js-cookie";
const loginToken = "token";
export const setLoginToken = (token: string) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
  Cookies.set(loginToken, token, { expires: expiresAt });
};

export const getLoginToken = () => {
  return Cookies.get(loginToken);
};
