define([
    "js/init/init"
], function () {
    $AS.modules.Tab = function (obj) {
        var t = this;
        t.d = {

            sidebar: false,
            inner: false,
            tabCategory:'default',

            name:'',
            $widget: $('<div class="automizy-sidebar-tab">TW</div>').click(function(){
                t.activate();
            })

        };

        if (typeof obj !== 'undefined') {
            if (typeof obj.sidebar !== 'undefined') {
                t.sidebar(obj.sidebar);
            }
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.inner !== 'undefined') {
                t.inner(obj.inner);
            }
            if (typeof obj.tabCategory !== 'undefined') {
                t.tabCategory(obj.tabCategory);
            }
            if (typeof obj.target !== 'undefined') {
                t.drawTo(obj.target);
            }
        }

        $AS.tabs.push(t);

    };


    var p = $AS.modules.Tab.prototype;

    p.widget = function () {
        return this.d.$widget;
    };
    p.show = function () {
        this.d.$widget.ashow();
        return this
    };
    p.hide = function () {
        this.d.$widget.ahide();
        return this;
    };
    p.activate = function () {
        var t = this;
        var tabs = t.sidebar().getAllTab();
        var activeTabCategory = t.tabCategory();
        var activeTabsCount = 0;

        for(var i = 0; i < tabs.length; i++){
            if(tabs[i].tabCategory() === activeTabCategory){
                tabs[i].show();
                activeTabsCount++;
            }
        }
        if(activeTabsCount <= 1) {
            t.hide();
        }

        t.inner().activate();

        return t;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            return t;
        }
        return t.d.name;
    };
    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.widget().text(t.d.text);
            return t;
        }
        return t.d.text;
    };
    p.tabCategory = function (tabCategory) {
        var t = this;
        if (typeof tabCategory !== 'undefined') {
            t.d.tabCategory = tabCategory;
            return t;
        }
        return t.d.tabCategory;
    };
    p.drawTo = function (target) {
        var t = this;
        target = target || 'body';
        if (typeof target.tabBox === 'function') {
            t.widget().appendTo(target.tabBox());
        }
        return t;
    };

    p.sidebar = function (sidebar) {
        var t = this;
        if (typeof sidebar !== 'undefined') {
            t.d.sidebar = sidebar;
            return t;
        }
        return t.d.sidebar;
    };
    p.inner = function (inner, reverse) {
        var t = this;
        if (typeof inner !== 'undefined') {
            if(typeof inner !== 'object'){
                inner = t.sidebar().getInnerByName(inner);
            }
            if(!(inner instanceof $AS.modules.Inner)){
                inner = $AS.newInner(inner);
            }
            t.d.inner = inner;
            if(reverse !== false) {
                t.d.inner.tab(t, false);
            }
            return t;
        }
        return t.d.inner;
    };

    $AS.newTab = function (tab) {
        if(typeof tab === 'undefined'){
            return new $AS.modules.Tab();
        }
        if(tab instanceof $AS.modules.Tab){
            return tab;
        }
        return new $AS.modules.Tab(tab || {});
    };

});
