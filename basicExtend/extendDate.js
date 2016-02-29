function getLocalTime(unixTime,boolen){
	var timestamp = new Date(parseInt(unixTime));
	var y = timestamp.getFullYear();
	var m = timestamp.getMonth()+1;
	var d = timestamp.getDate();
	var h = timestamp.getHours();
	var min = timestamp.getMinutes();
	return y+"/"+(String(m).length !=2 ? "0"+m : m)+'/'+(String(d).length !=2 ? "0"+d : d);
}

/** 原型扩展
 * var time1 = new Date().Format("yyyy-MM-dd");
 *	var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
 * @param {Object} fmt
 */
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/**
 * 判断是否闰年
 * @param {Object} year 年
 */
Date.isLeapYear = function(year){
	return (new Date(year,1,29).getDate() === 29);
}
