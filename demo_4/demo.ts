import {
    Component,
    HostBinding
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_4',
    host: {
        '(click)': 'showModal=false'
    },
    styleUrls: ['demo_4/app.css'],
    animations: [routerAnimations('route')],
    template: `
        <nav class="navigation">
            <button (click)="$event.stopPropagation(); showModal=true">Show Modal</button> 
        </nav>
        
        <modal *ngIf="showModal" (close)="showModal=false"></modal>
    `
})
export class Demo4 {
    @HostBinding('@route')
    public routeAnimations = true;
}
