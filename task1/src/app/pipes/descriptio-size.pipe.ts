import { Pipe, PipeTransform } from '@angular/core';

export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

@Pipe({ name: 'descriptionsize' })
export class DescriptionSizePipe implements PipeTransform {
    transform(description: string) {
        let result = description.slice(0, 100) + "...";
        return result;
    }
}