'use strict';

module.exports = function(Usuario) {

    Usuario.observe('before save', function setLegajo(ctx, next) {
        if (ctx.isNewInstance) {
            ctx.instance.legajo = 1
        }
        next();
    })
};