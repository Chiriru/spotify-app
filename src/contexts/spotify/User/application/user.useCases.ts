import { getRequest } from "../../shared/request"
import { getURLFromPathname } from "../../shared/spotify";
import { UserEntity } from "../model/user.entity";

const USER_PATHNAME = "/me/";

const USER_URL = getURLFromPathname(USER_PATHNAME);

const getUserData = (token: string) => {
  return getRequest<UserEntity>(USER_URL, { token });
}

// Was originially gonna be here, but it would be quite dirty to define URL resolution functions in here, that point to the /playlists
// endopoint.......
// const unfollowPlaylist = (playlistId: string, token: string) => {
//   deleteRequest()
// }

const token = "BQBLFvDMVp_HqgN5kY7VNln0Zz4fdREo_kj0yyF2V_ZCN_zIM5FzBKwrBtb_LAMsfLJGFUglX_t23ObZrXGyJ8AOF36ARmcsUdtcNh-IDXWYJodq4u7XBfF5l0gseS6Y8uWB_qf-a6l3YkrN37re9a16SxoVaaw_YNzghXVLNItUWTq249_znvA6mez6eAjtE8uwJVCbdCb0v1OPDUY3bklU4Y5vJsiaWlmr52AdrQvXX_eS4vYcV2BWurfTBG9Dsv4jk11kv6-CNVDaLvjlKPVsqC0a";

getUserData(token).then(console.log);