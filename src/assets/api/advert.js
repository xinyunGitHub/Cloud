import { axiosFetch } from "./../js/appUtils.js"

/* 【查询首页广告位数据】 */
export function queryAdvert(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/advert/query",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【创建首页广告位数据】 */
export function addAdvert(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/advert/add",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【编辑首页广告位数据】 */
export function editAdvert(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/advert/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【删除首页广告位数据】 */
export function delAdvert(params) {
  return axiosFetch({
    method: "POST",
    url: "apg/advert/del",
    params: params
  })
  .then((res) => {
    return res;
  })
}