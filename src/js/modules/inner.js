define([
    "js/init/init"
], function () {
    $AS.modules.Inner = function (obj) {
        var t = this;
        t.d = {

            sidebar: false,
            tab:false,
            groups: [],

            name:'',
            $widget: $('<div class="automizy-sidebar-inner"></div>')

        };

        if (typeof obj !== 'undefined') {
            if (typeof obj.sidebar !== 'undefined') {
                t.sidebar(obj.sidebar);
            }
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.tab !== 'undefined') {
                t.tab(obj.tab);
            }
            if (typeof obj.groups !== 'undefined') {
                t.groups(obj.groups);
            }
            if (typeof obj.target !== 'undefined') {
                t.drawTo(obj.target);
            }
        }

        $AS.inners.push(t);

    };


    var p = $AS.modules.Inner.prototype;

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
    p.activate = function (reverse) {
        var t = this;
        var inners = t.sidebar().getAllInner();
        var activeGroups = t.groups();

        if(t.tab() !== false) {
            if (reverse !== false) {
                t.tab().activate(false);
            }
        }else{
            t.sidebar().hideAllTab();
        }
        for(var i = 0; i < inners.length; i++){
            inners[i].hide();
        }
        t.show();

        for(var i = 0; i < activeGroups.length; i++){
            activeGroups[i].drawTo(t);
        }

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
    p.drawTo = function (target) {
        var t = this;
        target = target || $('body');
        if (typeof target.widget === 'function') {
            target = target.widget();
        }
        t.widget().appendTo(target);
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
    p.tab = function (tab, reverse) {
        var t = this;
        if (typeof tab !== 'undefined') {
            if(typeof tab !== 'object'){
                tab = t.sidebar().getTabByName(tab);
            }
            if(!(tab instanceof $AS.modules.Tab)){
                tab = $AS.newTab(tab);
            }
            t.d.tab = tab;
            if(reverse !== false) {
                t.d.tab.inner(t, false);
            }
            return t;
        }
        return t.d.tab;
    };

    p.groups = function (groups) {
        var t = this;
        if (typeof groups !== 'undefined') {
            for (var i = 0; i < groups.length; i++) {
                t.addGroup(groups[i]);
            }
            return t;
        }
        return t.d.groups;
    };
    p.addGroup = function (group) {
        var t = this;

        if (typeof group !== 'undefined') {
            if(typeof group !== 'object'){
                group = t.sidebar().getGroupByName(group);
            }
            if(!(group instanceof $AS.modules.Group)){
                group = t.sidebar().addGroup(group);
            }
            t.d.groups.push(group);
        }

        return t;
    };


    $AS.newInner = function (inner) {
        if(typeof inner === 'undefined'){
            return new $AS.modules.Inner();
        }
        if(inner instanceof $AS.modules.Inner){
            return inner;
        }
        return new $AS.modules.Inner(inner || {});
    };

});
