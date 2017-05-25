# Automizy-Sidebar ($AS)

Az **Automizy-Sidebar** elhelyez a weboldalad szélére egy dobozt. Ebben a boxban füleket, tartalmi blokkokat és csoportokat lehet készíteni. 

![screenshot 1](https://raw.github.com/automizy/automizy-sidebar/master/screenshot1.png)

### Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Options](#Options)
4. [Example](#Example)


<a name="Installation"></a>
## Installation

Download or fork **Automizy-Sidebar** at [GitHub](https://github.com/Automizy/Automizy-Sidebar).

```
git clone https://github.com/Automizy/Automizy-Sidebar
```

or install with Bower:

```
bower install Automizy-Sidebar
```

<a name="Usage"></a>
## Usage

First, load [jQuery](http://jquery.com) (v2.2.4 or greater), [Automizy-Project-Initializer](https://github.com/Automizy/Automizy-Project-Initializer), and the plugin:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>
<script src="vendor/automizy-project-initializer/automizy-project-initializer.js" type="text/javascript"></script>
<script src="vendor/automizy-sidebar/automizy-sidebar.min.js" type="text/javascript"></script>
<link href="vendor/automizy-sidebar/automizy-sidebar.min.css" rel="stylesheet" type="text/css">
```

Now, init the module and create a new sidebar:

```html
<script type="text/javascript">
    $AS.init().ready(function(){
        var sidebar = $AS.newSidebar().drawTo('body');
    });
</script>
```

<a name="Options"></a>
## Options

### New Sidebar

#### Init parameters

```javascript
var sidebar = $AS.newSidebar({
    name:'my-sidebar',
    target:'body',
    tabs:[ /*list of tabs*/ ],
    inners:[ /*list of inners*/ ],
    groups:[ /*list of groups*/ ]
})
```

#### Dynamic functions

```javascript
var sidebar = $AS.newSidebar();
sidebar.name('my-sidebar');
sidebar.drawTo('body');
sidebar.hide();
sidebar.show();
sidebar.tabBox();
sidebar.innerBox();
sidebar.tabs([ /*list of tabs*/ ]);
sidebar.addTab(module|object);
sidebar.getTabByName('my-tab');
sidebar.getAllTab();
sidebar.hideAllTab();
sidebar.inners([ /*list of inners*/ ]);
sidebar.addInner(module|object);
sidebar.getInnerByName('my-inner');
sidebar.getAllInner();
sidebar.groups([ /*list of inners*/ ]);
sidebar.addGroup(module|object);
sidebar.getGroupByName('my-group');
sidebar.getAllGroup();
var $widget = sidebar.widget();
```

### New Tab

#### Init parameters

```javascript
var tab = $AS.newTab({
    name:'my-tab',
    text:'Tab text',
    target:sidebarModule,
    inner:innerModule,
    sidebar:sidebarModule
})
```

#### Dynamic functions

```javascript
var tab  = $AS.newTab();
tab.name('ma-tab');             //get|set name
tab.text('Tab text');           //get|set text
tab.hide();
tab.show();
tab.showSiblings();
tab.drawTo(sidebarModule);
tab.inner(innerModule);         //get|set innerModule
tab.sidebar(sidebarModule);     //get|set sidebarModule
tab.activate();
tab.tabCategory('category1');   //get|set tab category
var $widget = tab.widget();
```

### New Inner

#### Init parameters

```javascript
var inner = $AS.newInner({
    name:'my-inner',
    target:sidebarModule,
    tab:tabModule,
    sidebar:sidebarModule,
    groups:[ /*list of groups*/ ]
})
```

#### Dynamic functions

```javascript
var inner  = $AS.newInner();
inner.name('my-inner');                 //get|set name
inner.hide();
inner.show();
inner.drawTo(sidebarModule);
inner.tab(tabModule);                   //get|set innerModule
inner.groups([ /*list of groups*/ ]);
inner.addGroup(module|object);
inner.sidebar(sidebarModule);           //get|set sidebarModule
var $widget = inner.widget();
```


### New Group

#### Init parameters

```javascript
var group = $AS.newGroup({
    name:'my-group',
    title:'Group title',
    content:content,
    sidebar:sidebarModule
})
```

#### Dynamic functions

```javascript
var group  = $AS.newGroup();
group.name('my-group');             //get|set name
group.hide();
group.show();
group.drawTo(sidebarModule);
group.sidebar(sidebarModule);       //get|set sidebarModule
group.title('Group titpe');         //get|set title
group.content(content);             //get|set content
var $widget = group.widget();
```


## Example

```javascript
$AS.init().ready(function () {
    
    window.sidebar = $AS.newSidebar({
        name: 'Sidebar name',
        target: 'body',
        tabs: [
            {
                name: 'fields',
                text: 'Fields'
            }, {
                name: 'style',
                text: 'Style'
            }, {
                name: 'form-actions',
                text: 'Form Actions'
            }
        ],
        inners: [
            {
                name: 'fields',
                tab: 'fields',
                groups: [
                    'layout',
                    'form-style',
                    'custom-css'
                ]
            }, {
                name: 'style',
                groups: [
                    'form-style',
                    'custom-css'
                ],
                tab: 'style'
            }, {
                name: 'form-actions',
                groups: [
                    'layout',
                    'custom-css'
                ],
                tab: 'form-actions'
            }
        ],
        groups: [
            {
                name: 'layout',
                title: 'Layout',
                content: 'Text content'
            }, {
                name: 'form-style',
                title: 'Form Style',
                content: $('<b>jQuery element</b>')
            }, {
                name: 'custom-css',
                title: 'Custom CSS',
                content: $A.newButton().text('Automizy element')
            }
        ]
    })
    
})
```



<a name="License"></a>
## License

Copyright (c) 2017 [Automizy](https://automizy.com).

**Automizy-Sidebar** is released under the [MIT license](http://github.com/automizy/automizy-sidebar/raw/master/LICENSE.md).
