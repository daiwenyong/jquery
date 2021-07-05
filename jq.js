(function (w, u) {

    var jQuery = function (selector) {
        return new jQuery.fn.init(selector)
    }
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function (selector) {
            selector = jQuery.trim(selector)
            // 函数
            if (jQuery.isFunction(selector)) {
                jQuery.ready(selector)
            }
            // 字符串
            else if (jQuery.isString(selector)) {
                var self = this
                var res = document.querySelectorAll(selector)
                // let res2 = Array.prototype.slice.call(res)
                jQuery.each(res, function (i, value) {
                    self[i] = value
                })
                self.length = res.length
            }
            return this
        },
        length: 0,
        each: function (fn) {
            return jQuery.each(this, fn);
        },
    }
    jQuery.extend = jQuery.prototype.extend = function (obj) {
        for (var i in obj) {
            this[i] = obj[i]
        }
    }
    // 工具类
    jQuery.extend({

        isArray: function (sele) {
            return jQuery.isObject(sele) && sele !== window && 'length' in sele
        },
        isObject: function (sele) {
            return typeof sele === 'object'
        },
        isFunction: function (fn) {
            return typeof fn === 'function'
        },
        isString: function (str) {
            return typeof str === 'string'
        },
        // 去空格
        trim: function (str) {
            if (!jQuery.isString(str)) {
                return str
            } else if (str.trim) {
                return str.trim()
            } else {
                //   \s：空格
                //   \uFEFF：字节次序标记字符（Byte Order Mark），也就是BOM,它是es5新增的空白符
                //   \xA0：禁止自动换行空白符，相当于html中的&nbsp;
                return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
            }
        },
        each: function (obj, fn) {
            if (jQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    // this 为obj[i] res为true跳过 false跳出循环
                    var res = fn.call(obj[i], i, obj[i])
                    if (res===true) {
                        continue
                    } else if (res===false) {
                        break
                    }
                }
            } else if (jQuery.isObject(obj)) {
                console.log(2)
                for (let i in obj) {
                    var res = fn.call(obj[i], i, obj[i])
                    if (res===true) {
                        continue
                    } else if (res===false) {
                        break
                    }
                }
            }
        },
        map:function(){
            
        },
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom)[styleName];
            } else {
                return dom.currentStyle[styleName];
            }
        },
        ready: function (fn) {
            // 如果已经加载过了, 那么直接调用回调
            if (document.readyState == "complete") {
                fn();
            }
            // 如果没有加载过,判断是否支持addEventListener方法, 支持就使用addEventListener方法监听DOM加载
            else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                });
            }
            // 如果不支持addEventListener方法, 就使用attachEvent方法监听
            else {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState == "complete") {
                        fn();
                    }
                });
            }

        },
    })
    // 属性
    jQuery.prototype.extend({
        css: function (attr, value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return jQuery.getStyle(this[0], attr)
                } else {
                    jQuery.each(this, function (key, ele) {
                        ele.style[attr] = value
                    })
                }
            }
            else if (jQuery.isObject(attr)) {
                jQuery.each(this, function (k, ele) {
                    jQuery.each(attr, function (i, value) {
                        ele.style[attr] = value
                    })
                })
            }
        }
    })

    jQuery.fn.init.prototype = jQuery.prototype
    w.$ = w.jQuery = jQuery
})(window)