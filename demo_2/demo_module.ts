import {Demo2} from './demo';
import {NgModule} from '@angular/core';
import {ImagePreview} from './image_preview';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    bootstrap: [Demo2],
    declarations: [Demo2, ImagePreview],
    imports: [BrowserModule]
})
export class Demo2Module { }
