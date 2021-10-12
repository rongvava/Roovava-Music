//将时间戳转换成时间格式
export function dateChange(value,dateFormat) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    switch (dateFormat) {
        case 'yy-mm-dd hh:mm:ss':
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            break;
        case 'yy-mm-dd':
            return y + '-' + MM + '-' + d ;
            break;
        case 'yy-mm':
            return y + '-' + MM ;
            break;
        case 'hh:mm':
            return h + ':' + m ;
            break;
        case 'yy-mm-dd':
            return y + '-' + MM + '-' + d ;
            break;
        case 'mm-dd':
            return  MM + '月' + d + '日' ;
            break;
        default:
            return  MM + '月' + d + '日' ;
            break;
    }
}
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}
