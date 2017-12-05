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
    createTables: function() {
        app.database.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS demo (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)');
        }, 
        function (error) {
            ons.notification.alert(error.message);
            app.database.close();
        });
    },
    create: function(data) {
        app.database.transaction(function (tx) {                
            var query = "INSERT INTO demo (text) VALUES (?)";        
            tx.executeSql(query, [data.text], function(tx, res) {
                app.services.tasks.create({
                    id: res.insertId,
                    text: data.text
                });
            },
            function(tx, error) {
                ons.notification.alert('add: ' + error.message);
            });
        }, 
        function(error) {
            ons.notification.alert('transaction > add: ' + error.message);
        });
    },    
    update: function(data) {
        app.database.transaction(function (tx) {                
            var query = "UPDATE demo SET text = ? WHERE id = ?";        
            tx.executeSql(query, [data.text, data.id], function(tx, res) {
                //
            },
            function(tx, error) {
                ons.notification.alert('update: ' + error.message);
            });
        }, 
        function(error) {
            ons.notification.alert('transaction > update: ' + error.message);
        });
    },     
    delete: function(id) {
        app.database.transaction(function (tx) {                
            var query = "DELETE FROM demo WHERE id = ?";        
            tx.executeSql(query, [id], function(tx, res) {
                //
            },
            function(tx, error) {
                ons.notification.alert('update: ' + error.message);
            });
        }, 
        function(error) {
            ons.notification.alert('transaction > update: ' + error.message);
        });
    },     
    getList: function() {
        app.database.transaction(function (tx) {
            var query = "SELECT * FROM demo";
        
            tx.executeSql(query, [], function (tx, resultSet) {
                for(var x = 0; x < resultSet.rows.length; x++) {                    
                    app.services.tasks.create(
                        {
                            id: resultSet.rows.item(x).id,
                            text: resultSet.rows.item(x).text
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