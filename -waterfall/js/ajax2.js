// 1.浏览器
// 2.ajax对象
// 3.初始化 HTTP 请求参数(方法 地址 data 回调函数 同步异步)
// 4.发送请求
// 5.监控数据
// 6.检查数据 使用

function ajax(method, url, callback, data, flag) {
    var xml = null;

    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject('Microsoft.XMLHttp');
    }


    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date();
        timer = date.getTime();
        xml.open('GET',url +'?'+ data + '&timer=' + timer, flag);
        xml.send();
    } else {
        xml.open('POST',url, flag);
        xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xml.send(data);
    }

    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                callback(xml.responseText)
            }
        }
    }
}