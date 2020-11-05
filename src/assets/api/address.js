import { axiosFetch } from "./../js/appUtils.js"

/* 【查询收货地址数据】 */
export function queryAddress(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/address/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【根据手机号查询收货地址数据】 */
export function phoneAddress(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/address/phone",
    params: params
  })
  .then((res) => {
    return res;
  })
}