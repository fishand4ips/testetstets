let base = {
    findClass: function(str, node) {
        if(document.getElementsByClassName) return (node || document).getElementsByClassName(str);
        else {
            var node = node || document, list = node.getElementsByTagName('*'), length = list.length, Class = str.split(/\s+/), classes = Class.length, array = [], i, j, key;
            for(i = 0; i < length; i++) {
                key = true;
                for(j = 0; j < classes; j++) if(list[i].className.search('\\b' + Class[j] + '\\b') == -1) key = false;
                if(key) array.push(list[i]);
            }
            return array;
        }
    },
    bind: function(node, type, listener) {
        if(node.addEventListener) node.addEventListener(type, listener, false);
    },
    init: [],
    ready: function() {
        if(!arguments.callee.done) {
            arguments.callee.done = true;
            if(this.timer) clearInterval(this.timer);
            var i, length = this.init.length;
            for(i = 0; i < length; i++) this.init[i]();
            this.init = [];
        }
    },
    check: function() {
        let _this = this, listener = function() {
            _this.ready();
        };
        if(document.addEventListener) document.addEventListener('DOMContentLoaded', listener, false);
        if(/KHTML|WebKit/i.test(navigator.userAgent)) this.timer = setInterval(function() {
            if(/loaded|complete/.test(document.readyState)) base.ready();
        }, 10);
        this.bind(window, 'load', listener);
    }
};


let toggler = {
    process: function() {
        let i, list = base.findClass('toggler'), length = list.length;
        for(i = 0; i < length; i++) base.bind(list[i], 'click', this.toggle);
        list = base.findClass('content');
        length = list.length;
        for(i = 0; i < length; i++) list[i].style.display = 'none';
    },
    toggle: function() {
        var content = base.findClass('content', this.parentNode)[0], e = arguments[0] || window.event;
        if(content.style.display == 'block') {
            content.style.display = 'none';
            this.innerHTML = 'Подробнее';
        }
        else {
            content.style.display = 'block';
            this.innerHTML = 'Скрыть';
        }
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
};

base.init.push(function() {
    toggler.process();
});

base.check();