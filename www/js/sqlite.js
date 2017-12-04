app.sqlite = {
    tests: {
        selfTest: function() {
            window.sqlitePlugin.selfTest(function() {
                ons.notification.alert("SQLite self test OK");
            });
        },
        echoTest: function() {
            window.sqlitePlugin.echoTest(function() {
                ons.notification.alert("SQLite echo test OK");
            });
        },
    },
    openDatabase: function() {
        app.database = window.sqlitePlugin.openDatabase({name: 'startmeup.db', location: 'default'});
    },    
    create: function() {
        app.database.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS demo (title)');
        }, 
        function (error) {
            ons.notification.alert(error.message);
            app.database.close();
        });
    },
    add: function(title) {
        app.database.transaction(function (tx) {                
            var query = "INSERT INTO demo (title) VALUES (?)";        
            tx.executeSql(query, [title], function(tx, res) {
                ons.notification.alert('insertId: ' + res.insertId + ' rowsAffected: ' + res.rowsAffected);
            },
            function(tx, error) {
                ons.notification.alert('add: ' + error.message);
            });
        }, 
        function(error) {
            ons.notification.alert('transaction > add: ' + error.message);
        });
    },    
    getList: function() {
        var list = [];
        app.database.transaction(function (tx) {
            var query = "SELECT * FROM demo";
        
            tx.executeSql(query, [], function (tx, resultSet) {
                for(var x = 0; x < resultSet.rows.length; x++) {                    
                    app.services.tasks.create(
                        {
                            title: resultSet.rows.item(x).title
                        }
                    );
                }                                  
            },
            function (tx, error) {
                ons.notification.alert('getlist: ' + error.message);
            });
        }, 
        function (error) {
            ons.notification.alert('transaction > getlist: ' + error.message);
        });
    },    
};