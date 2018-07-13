import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currencyFormatPipe'
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: number,
              currencySign = '$ ',
              decimalLength = 2,
              chunkDelimiter = '.',
              decimalDelimiter = ',',
              chunkLength = 3): string {

        // value /= 100;

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
        let num = value.toFixed(Math.max(0, ~~decimalLength));

        return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }
}
