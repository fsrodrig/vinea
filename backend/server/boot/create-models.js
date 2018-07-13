module.exports = function(app) {
    'use strict'
    var mssql = app.dataSources.vinea;

    for (var model in app.models) {
        if (!(model === 'User' || model === 'AccessToken')) {
            console.log("Cheking if table for model " + model + " is created and up-to-date in DB...");
            // mssql.autoupdate(model, function() {});
        }

    }
};