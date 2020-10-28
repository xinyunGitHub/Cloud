import { axiosFetch } from "./../js/appUtils.js"

/* 【登录cloud后台】 */
export function loginCloud(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/manage/login",
    params: params
  })
  .then((res) => {
    return res;
  })
}