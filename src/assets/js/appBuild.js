import { axiosFetch, setItem, delItem } from "./appUtils.js"
import store from "./../../store"

export function initialize(account, token, expired) { /* @@ 验证用户权限 */
  return new Promise((ret, rej) => {
    if (token && expired) {
      axiosFetch({
        method: "POST",
        url: "apg/manage/verify",
        params: {
          account: account,
          token: token,
          expired: expired
        }
      })
      .then((res) => {
        if (res.status) {
          setItem("token", res.data.token);
          setItem("expired", res.data.expired);
          store.commit("setLoginStatus", true);
        } else {
          delItem("expired");
          delItem("token");
          store.commit("setLoginStatus", false);
        }
        ret();
      })
      .catch(() => {
        rej();
      })
    } else {
      rej();
    }
  })
}