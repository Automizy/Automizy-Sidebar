# Automizy-Sidebar ($AS)

Az **Automizy-Sidebar** elhelyez a weboldalad szélére egy dobozt. Ebben a boxban füleket, tartalmi blokkokat és csoportokat lehet készíteni. 

![screenshot 1](https://raw.github.com/automizy/automizy-sidebar/master/screenshot1.png)

### Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
4. [Options](#Options)


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

### New sidebar

#### Init parameters

```javascript
$AS.newSidebar({
    name:'Sidebar name',
    tabs:[ /*list of tabs*/ ],
    inners:[ /*list of inners*/ ],
    groups:[ /*list of groups*/ ]
})
```

#### Dynamic functions

```javascript
var sidebar = $AS.newSidebar();
sidebar.name('Sidebar name');
sidebar.tabs([ /*list of tabs*/ ]);
sidebar.addTab(module|object);
sidebar.inners([ /*list of inners*/ ]);
sidebar.addInner(module|object);
sidebar.groups([ /*list of inners*/ ]);
sidebar.addGroup(module|object);
```


<a name="License"></a>
## License

Copyright (c) 2017 [Automizy](https://automizy.com).

**Automizy-Sidebar** is released under the [MIT license](http://github.com/automizy/automizy-sidebar/raw/master/LICENSE.md).
