import { axiosFetch } from "./../js/appUtils.js"

/* 【查询Sku数据】 */
export function queryMemory(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/memory/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【编辑|新增Sku数据】 */
export function editMemory(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/memory/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【删除Sku数据】 */
export function delMemory(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/memory/del",
    params: params
  })
  .then((res) => {
    return res;
  })
}