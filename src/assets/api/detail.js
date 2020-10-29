import { axiosFetch } from "./../js/appUtils.js"

/* 【查询商品详情数据】 */
export function queryDetail(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/detail/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【查询商品详情数据】 */
export function addDetail(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/detail/add",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【查询商品详情数据】 */
export function editDetail(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/detail/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【查询商品详情数据】 */
export function deleteDetail(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/detail/del",
    params: params
  })
  .then((res) => {
    return res;
  })
}