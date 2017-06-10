define([
    "js/init/init"
], function () {
    $AS.modules.Sidebar = function (obj) {
        var t = this;
        t.d = {

            tabs:[],
            inners:[],
            groups:[],

            activeInner:false,
            activeTab:false,

            name:'',
            $widget: $('<div class="automizy-sidebar"></div>'),
            $tabsTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-sidebar-tabs-table"></table>'),
            $tabs: $('<tr class="automizy-sidebar-tabs"></tr>'),
            $inners: $('<div class="automizy-sidebar-inners"></div>')

        };

        t.d.$tabsTable.appendTo(t.d.$widget);
        t.d.$tabs.appendTo(t.d.$tabsTable);
        t.d.$inners.appendTo(t.d.$widget);

        if (typeof obj !== 'undefined') {
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.groups !== 'undefined') {
                t.groups(obj.groups);
            }
            if (typeof obj.tabs !== 'undefined') {
                t.tabs(obj.tabs);
            }
            if (typeof obj.inners !== 'undefined') {
                t.inners(obj.inners);
            }
            if (typeof obj.target !== 'undefined') {
                t.drawTo(obj.target);
            }
        }

    };


    var p = $AS.modules.Sidebar.prototype;

    p.widget = function () {
        return this.d.$widget;
    };
    p.tabBox = function () {
        return this.d.$tabs;
    };
    p.innerBox = function () {
        return this.d.$inners;
    };
    p.show = function () {
        this.d.$widget.ashow();
        return this
    };
    p.hide = function () {
        this.d.$widget.ahide();
        return this;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            return t;
        }
        return t.d.name;
    };
    p.activeInner = function (activeInner) {
        var t = this;
        if (typeof activeInner !== 'undefined') {
            t.d.activeInner = activeInner;
            return t;
        }
        return t.d.activeInner;
    };
    p.activeTab = function (activeTab) {
        var t = this;
        if (typeof activeTab !== 'undefined') {
            t.d.activeTab = activeTab;
            return t;
        }
        return t.d.activeTab;
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


    p.inners = function (inners) {
        var t = this;
        if (typeof inners !== 'undefined') {
            for (var i = 0; i < inners.length; i++) {
                t.addInner(inners[i]);
            }
            return t;
        }
        return t.d.inners;
    };
    p.addInner = function (inner) {
        var t = this;
        if(!(inner instanceof $AS.modules.Inner)){
            inner.sidebar = t;
            inner = $AS.newInner(inner);
        }
        t.d.inners.push(inner);
        inner.sidebar(t).drawTo(t.d.$inners);
        return t;
    };
    p.getInnerByName = function(innerName){
        var t = this;
        for(var i = 0; i < t.d.inners.length; i++){
            if(t.d.inners[i].name() === innerName){
                return t.d.inners[i];
            }
        }
        return false;
    };
    p.getAllInner = function(){
        return this.d.inners;
    };


    p.tabs = function (tabs) {
        var t = this;
        if (typeof tabs !== 'undefined') {
            for (var i = 0; i < tabs.length; i++) {
                t.addTab(tabs[i]);
            }
            return t;
        }
        return t.d.tabs;
    };
    p.addTab = function (tab) {
        var t = this;
        if(!(tab instanceof $AS.modules.Tab)){
            tab.sidebar = t;
            tab = $AS.newTab(tab);
        }
        t.d.tabs.push(tab);
        tab.sidebar(t).drawTo(t);
        return t;
    };
    p.getTabByName = function(tabName){
        var t = this;
        for(var i = 0; i < t.d.tabs.length; i++){
            if(t.d.tabs[i].name() === tabName){
                return t.d.tabs[i];
            }
        }
        return false;
    };
    p.getAllTab = function(){
        return this.d.tabs;
    };

    p.hideAllTab = function(){
        var t = this;
        for(var i = 0; i < t.d.tabs.length; i++){
            t.d.tabs[i].hide();
        }
        t.widget().removeClass('automizy-sidebar-has-tabs');
        return false;
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
        if(!(group instanceof $AS.modules.Group)){
            group.sidebar = t;
            group = $AS.newGroup(group);
        }
        t.d.groups.push(group);
        group.sidebar(t);
        return t;
    };
    p.getGroupByName = function(groupName){
        var t = this;
        for(var i = 0; i < t.d.groups.length; i++){
            if(t.d.groups[i].name() === groupName){
                return t.d.groups[i];
            }
        }
        return false;
    };
    p.getAllGroup = function(){
        return this.d.groups;
    };

    $AS.newSidebar = function (sidebar) {
        if(typeof sidebar === 'undefined'){
            return new $AS.modules.Sidebar();
        }
        if(sidebar instanceof $AS.modules.Sidebar){
            return sidebar;
        }
        return new $AS.modules.Sidebar(sidebar || {});
    };

});
