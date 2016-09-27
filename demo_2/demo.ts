import {Component, HostBinding} from '@angular/core';
import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_2',
    animations: [routerAnimations('routeAnimations')],
    template: `
        <image-preview [activeImage]="activeImage"></image-preview>
        <div class="images-list">
           <img class="mini-image" *ngFor="let image of images" [attr.src]="image" (click)="activeImage = image" />
        </div> 
    `,
    styles: [`
        :host { display:table; width:100%; }
        :host:after {
            position:fixed;
            bottom:0;
            left:0;
            right:0;
            height:3%;
            background:white;
            border-top:3px solid #ccc;
            content:"";
        }
        .mini-image {
            display:inline-block;
            width:50%;
            cursor:pointer;
            margin-top:-3px;
            vertical-align:top;
        }
        image-preview, .images-list {
            vertical-align:top; display:table-cell;
        }
        image-preview { width:75%; border:1px solid #999; }
        .images-list { width:25%; background:#f9f9f9; }
    `]
})
export class Demo2 {
    activeImage = null;
    images = [
        './demo_2/images/1.jpg',
        './demo_2/images/2.jpg',
        './demo_2/images/3.jpg',
        './demo_2/images/4.jpg',
        './demo_2/images/5.jpg',
        './demo_2/images/6.jpg',
        './demo_2/images/7.jpg',
        './demo_2/images/8.jpg',
        './demo_2/images/9.jpg',
        './demo_2/images/10.jpg',
        './demo_2/images/11.jpg',
        './demo_2/images/12.jpg'
    ];

    @HostBinding('@routeAnimations')
    public routeAnimations = true;

    constructor() {
        this.activeImage = this.images[0];
    }
}
