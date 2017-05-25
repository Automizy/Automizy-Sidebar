(function(){
    function hasFont(className, fontFamily) {
        var span = document.createElement('span');
        span.className = className;
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') === fontFamily) {
            document.body.removeChild(span);
            return true;
        }
        document.body.removeChild(span);
        return false;
    }

    window.AutomizySidebar = window.$AS = new AutomizyProject({
        variables: {
            groups:[],
            inners:[],
            tabs:[]
        },
        plugins: [
            {
                name: 'fontawesome',
                skipCondition: function(){return hasFont('fa', 'FontAwesome')},
                css: "vendor/fontawesome/css/font-awesome.min.css"
            },
            {
                name: 'automizy-js',
                skipCondition: typeof AutomizyJs !== 'undefined',
                css: "vendor/automizy-js/automizy.css",
                js: [
                    "vendor/automizy-js/languages/en_US.js",
                    "vendor/automizy-js/automizy.js"
                ],
                complete: function () {
                    $A.setTranslate(window.I18N || {});
                }
            },
            {
                name: 'automizy-js-api',
                skipCondition: typeof AutomizyJsApi !== 'undefined',
                js: "vendor/automizy-js-api/automizy.api.js",
                requiredPlugins: [
                    'automizy-js'
                ]
            }
        ]
    });
})();

(function(){
    $AS.modules.Group = function (obj) {
        var t = this;
        t.d = {

            sidebar: false,

            name:'',
            title:'',
            $widget: $('<div class="automizy-sidebar-group"></div>'),
            $title: $('<div class="automizy-sidebar-group-title"></div>'),
            $content: $('<div class="automizy-sidebar-group-content"></div>')

        };

        if (typeof obj !== 'undefined') {
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.sidebar !== 'undefined') {
                t.sidebar(obj.sidebar);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.target !== 'undefined') {
                t.drawTo(obj.target);
            }
        }

        t.d.$title.appendTo(t.d.$widget);
        t.d.$content.appendTo(t.d.$widget);

        $AS.groups.push(t);

    };


    var p = $AS.modules.Group.prototype;

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

    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            if(t.d.$title.text().length <= 0){
                t.d.$title.hide();
            }else{
                t.d.$title.show();
            }
            return t;
        }
        return t.d.title;
    };

    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if (t.d.$content.contents() instanceof jQuery) {
                t.d.$content.contents().appendTo($AS.$tmp);
            }
            t.d.$content.empty();
            t.d.content = content;
            if (t.d.content instanceof jQuery) {
                t.d.content.appendTo(t.d.$content);
            } else if(typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };

    $AS.newGroup = function (group) {
        if(typeof group === 'undefined'){
            return new $AS.modules.Group();
        }
        if(group instanceof $AS.modules.Group){
            return group;
        }
        return new $AS.modules.Group(group || {});
    };

})();

(function(){
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

})();

(function(){
    $AS.modules.Tab = function (obj) {
        var t = this;
        t.d = {

            sidebar: false,
            inner: false,
            tabCategory:'default',

            name:'',
            $widget: $('<td class="automizy-sidebar-tab">TW</td>').click(function(){
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
        var t = this;
        t.d.$widget.ashow();
        return t
    };
    p.showSiblings = function(){
        var t = this;
        var tabs = t.sidebar().getAllTab();
        var activeTabCategory = t.tabCategory();
        for(var i = 0; i < tabs.length; i++){
            tabs[i].widget().removeClass('automizy-active');
            if(tabs[i].tabCategory() === activeTabCategory){
                tabs[i].show();
            }else{
                tabs[i].hide();
            }
        }
        return t
    };

    p.hide = function () {
        this.d.$widget.ahide();
        return this;
    };
    p.activate = function (reverse) {
        var t = this;

        t.showSiblings();
        t.widget().addClass('automizy-active');
        if(reverse !== false) {
            t.inner().activate(false);
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

})();

(function(){
    $AS.modules.Sidebar = function (obj) {
        var t = this;
        t.d = {

            tabs:[],
            inners:[],
            groups:[],

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

})();

(function(){
    $AS.pluginsLoaded(function () {

        $AS.$tmp = $('<div id="automizy-sidebar-tmp"></div>');

        $AS.layoutReady();
        $AS.ready();
    });
})();

(function(){
    console.log('%c AutomizySidebar loaded! ', 'background: #000000; color: #bada55; font-size:14px');
})();

(function(){})();