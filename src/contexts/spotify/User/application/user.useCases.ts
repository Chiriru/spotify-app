import { getRequest } from "../../shared/request"
import { getURLFromPathname } from "../../shared/spotify";
import { UserEntity } from "../model/user.entity";

const USER_PATHNAME = "/me/";

const USER_URL = getURLFromPathname(USER_PATHNAME);

export const getUserData = (token: string) => {
  return getRequest<UserEntity>(USER_URL, { token });
}
