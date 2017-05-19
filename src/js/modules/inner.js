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
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.sidebar !== 'undefined') {
                t.sidebar(obj.sidebar);
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
    p.activate = function () {
        var t = this;
        var inners = t.sidebar().getAllInner();
        var activeGroups = t.groups();

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

    p.sidebar = function () {
        var t = this;
        return t.sidebar();
    };
    p.tab = function (tab, reverse) {
        var t = this;
        if (typeof tab === 'undefined') {
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
        if(typeof group !== 'object'){
            group = t.sidebar().getGroupByName(group);
        }
        t.d.groups.push(group);
        return t;
    };


    $AS.newInner = function (inner) {
        if(typeof inner === 'undefined'){
            return new $AS.modules.Inner();
        }
        if(group instanceof $AS.modules.Inner){
            return inner;
        }
        return new $AS.modules.Inner(inner || {});
    };

});
