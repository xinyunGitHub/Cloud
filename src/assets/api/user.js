import { axiosFetch } from "./../js/appUtils.js"

/* 【查询注册用户数据】 */
export function queryUser(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/user/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}