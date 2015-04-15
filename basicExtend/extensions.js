// JavaScript Document Sumer Liu 2015/3/31
// JS extention for normal

//Object Extention
/**
 *
 * @param name 使用该方法扩展对象方法时的命名
 * @param fn 扩展对象方法
 * @returns {Object}
 */
Object.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
}
/**
 * 在函数式继承时，调用父类
 */
Object.method('superior',function(name){
	var that = this;
	var method = that[name];
	return function(){
		return method.apply(that,arguments);
	}
});
/**
 * 构造beget方法，该方法用于使用对象构造伪类
 */
if(typeof Object.beget !== 'function'){
	Object.beget = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	}
}

