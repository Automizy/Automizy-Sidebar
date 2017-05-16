define([
    "js/init/init"
], function () {
    $AS.pluginsLoaded(function () {

        $AS.$tmp = $('<div id="automizy-sidebar-tmp"></div>');

        $AS.layoutReady();
        $AS.ready();
    });
});