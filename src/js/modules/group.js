define([
    "js/init/init"
], function () {
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

    p.sidebar = function () {
        var t = this;
        return t.sidebar();
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

});
