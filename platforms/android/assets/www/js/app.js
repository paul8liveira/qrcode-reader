window.app = {};

function onDeviceReady() {
    app.sqlite.tests.canOpenDatabase();
}

document.addEventListener('init', function(event) {
    document.addEventListener("deviceready", onDeviceReady, false);
    
    var page = event.target;

    if (app.controllers.hasOwnProperty(page.id)) {
        app.controllers[page.id](page);
    }

    if (page.id === 'indexPage') {
        if (document.querySelector('#indexPage') && !document.querySelector('#indexPage ons-list-item')) {
            var list = app.services.tasks.getList();
            list.forEach(function(data) {
                app.services.tasks.create(data);
            });                               
        }
    }
});