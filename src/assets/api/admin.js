import { axiosFetch } from "./../js/appUtils.js"

/* 【查询管理员数据】 */
export function queryAdmin(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/manage/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【新增管理员数据】 */
export function addAdmin(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/manage/add",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【编辑管理员数据】 */
export function editAdmin(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/manage/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}
/* 【删除管理员数据】 */
export function deleteAdmin(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/manage/del",
    params: params
  })
  .then((res) => {
    return res;
  })
}