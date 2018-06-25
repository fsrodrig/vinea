module.exports = function(app) {

    //Our mssql datasource
    var db = app.dataSources.vinea;

    db.once('connected', function() {

        //Check AccessToken.id datatype
        db.connector.execute('SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=\'AccessToken\' AND COLUMN_NAME=\'id\'', [], function(err, res) {
            var idType;
            if (err) {
                console.log('Failed to check AccessToken.id column type', err.message);
            } else {
                idType = res.length ? res[0].DATA_TYPE : null;
                console.log('AccessToken.id type is ' + idType);
            }

            //Id column is already nvarchar - abort!
            if (idType === 'nvarchar') return;

            //Drop access token table and recreate
            db.connector.execute('DROP TABLE dbo.AccessToken', [], function(err, res) {
                if (err) {
                    console.log('Failed to drop AccessToken table', err.message);
                } else {
                    console.log('Dropped AccessToken table successfully');
                }
                db.connector.execute('CREATE TABLE dbo.AccessToken (id nvarchar(100) NOT NULL, ttl int NULL, scopes nvarchar(50) NULL, created datetime NULL, userId int NULL) ON[PRIMARY]', [], function(err, res) {
                    if (err) {
                        console.log('Failed to create AccessToken table', err.message);
                    } else {
                        console.log('Created AccessToken table successfully');
                        db.connector.execute('ALTER TABLE dbo.AccessToken ADD CONSTRAINT PK_AccessToken PRIMARY KEY CLUSTERED (id) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]', [], function(err, res) {
                            if (err) {
                                console.log('Failed to create PK_AccessToken constraint', err.message);
                            } else {
                                console.log('Successfully created PK_AccessToken constraint');
                            }
                        });
                    }
                });
            });
        });

    });
}