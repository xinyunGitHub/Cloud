import { axiosFetch } from "./../js/appUtils.js"

/* 【查询订单列表数据】 */
export function orderList(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/order/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【根据手机号流水号查询订单】 */
export function orderValue(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/order/value",
    params: params
  })
  .then((res) => {
    return res;
  })
}