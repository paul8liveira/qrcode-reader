window.app = {};

var init = {
    go: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('init', this.onInit, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);        
    },
    onInit: function (event) {
        var page = event.target;
    
        if (app.controllers.hasOwnProperty(page.id)) {
            app.controllers[page.id](page);
        }
        ons.notification.alert("init onsen");
    },
    onDeviceReady: function() {        
        app.sqlite.openDatabase();    
        app.sqlite.create();  
    
        var d = new Date();
        app.sqlite.add(d.toString());

        //já está obtendo a lsita do banco e carregando a lista na tela. por enquanto ficará assim
        app.sqlite.getList();          
    },    
};
init.go();