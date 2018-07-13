import {FormControl, NG_VALIDATORS} from '@angular/forms';
import {Directive} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Directive({
    selector: '[cuitValidator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useValue: cuitValidator,
            multi: true
        }
    ]
})

export class CuitValidatorDirective {

}

export function cuitValidator(control: FormControl) {

    let cuit = control.value;

    if (isNullOrUndefined(cuit) || cuit < 20000000000 || cuit > 99999999999) {
        return {
            cuitInvalid: 'CUIT/CUIL Inválido'
        };
    }

    let acumulado = 0;
    let digitos = cuit.toString().split('');
    let digito = digitos.pop();

    for (let i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
    }

    let verif = 11 - (acumulado % 11);
    if (verif === 11) {
        verif = 0;
    } else if (verif === 10) {
        verif = 9;
    }

    if (digito === verif.toString()) {
        return null;
    } else {
        return {
            cuitInvalid: 'CUIT/CUIL Inválido'
        };
    }

}
