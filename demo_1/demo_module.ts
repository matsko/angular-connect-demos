import {Demo1} from './demo';
import {NgModule} from '@angular/core';
import {Slider} from './slider';

@NgModule({
    bootstrap: [Demo1],
    declarations: [Demo1, Slider]
})
export class Demo1Module { }
