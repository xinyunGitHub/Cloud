import { axiosFetch } from "./../js/appUtils.js"

/* 【查询商品数据】 */
export function queryGoods(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/goods/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【新增商品数据】 */
export function addGoods(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/goods/add",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【编辑商品数据】 */
export function editGoods(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/goods/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【删除商品数据】 */
export function deleteGoods(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/goods/del",
    params: params
  })
  .then((res) => {
    return res;
  })
}