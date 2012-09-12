/*
 * Class powers the OOP facilities of the library. Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (/*Object*/ props) /*-> Class*/ {

	// extended class with the new prototype
	// 用新的原型拓展类
	var NewClass = function () {
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};

	// instantiate class without calling constructor
	// 不调用构造函数实例化类
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	// 继承父类的静态方法
	for (var i in this) {
		// 判断this中是否有名称为i的属性，并且i不等于'prototype'
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	// 混合静态属性添加到类
	if (props.statics) {
		L.Util.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	// 组合包括到原型
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	// 合并选项
	if (props.options && proto.options) {
		props.options = L.Util.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.Util.extend(proto, props);

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.Util.extend(this.prototype, props);
};

L.Class.mergeOptions = function (options) {
	L.Util.extend(this.prototype.options, options);
};