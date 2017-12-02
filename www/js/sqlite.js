app.sqlite = {
    tests: {
        selfTest: function() {
            ons.notification.alert("ante do selftest chamado pelo serviço");
            window.sqlitePlugin.selfTest(function() {
                ons.notification.alert("SQLite self test OK");
            });
        },
        echoTest: function() {
            window.sqlitePlugin.echoTest(function() {
                ons.notification.alert("SQLite echo test OK");
            });
        },
        canOpenDatabase: function() {
            var db = window.sqlitePlugin.openDatabase({name: 'startmeup.db', location: 'default'});
            app.database = db;
            db.transaction(function(tr) {
                tr.executeSql("SELECT upper('Test string4') AS upperString", [], function(tr, rs) {
                    ons.notification.alert("SQLite canOpenDatabase test: " + rs.rows.item(0).upperString);                    
                });
            });
        },
    },
};