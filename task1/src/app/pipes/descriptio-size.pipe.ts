import { Pipe, PipeTransform } from '@angular/core';

export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

@Pipe({ name: 'descriptionsize' })
export class DescriptionSizePipe implements PipeTransform {
    transform(description: string, symbolsQuantity: number) {
        let result:string;
        result = description.slice(0, symbolsQuantity) + "...";
        if(description.length < symbolsQuantity){result = description.slice(0, symbolsQuantity)}
        return result;
    }
}