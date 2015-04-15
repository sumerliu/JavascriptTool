/**
 * Created by Sumer on 2015/4/15.
 */
//跨域部分扩展
/**
 * 创建一个script标签
 * @param url
 * @param ele
 */
function createScript(url,ele) {
    //console.log(ele);
    ele.src = url;
    ele.type = 'text/javascript';
    ele.language = 'javascript';
}
/**
 * 用于跨域获取脚本
 * @param url
 */
function getJSONBySumer(url){
    var ele = document.createElement('script'); //这是一个新的ele
    createScript(url,ele);
    return ele;
}
/**
 * 获取脚本内容
 * @param ele
 */
function getData(ele) {
    //TO-DO 此处扩展跨域数据做获取的处理
}
function dealData(data){
    //TO-DO
}