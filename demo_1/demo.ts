import {
    Component,
    HostBinding
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_1',
    styles: [`
      :host { background:#eee; }
      slider {
        display:block;
        padding:50px;
        position:fixed;
        box-shadow:0 0 10px #ddd;
        top:50%;
        left:50%;
        height:65%;
        width:50%;
        transform:translateX(-50%) translateY(-50%);
        border:10px solid rgba(255,255,255,0.5);
        background:white;
      }
    `],
    templateUrl: './demo_1/demo.html',
    animations: [routerAnimations('routeAnimations')]
})
export class Demo1 {
    @HostBinding('@routeAnimations')
    public animatePage = true;
}
