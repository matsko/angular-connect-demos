import {Input, Component, trigger, animate, style, transition, state} from '@angular/core';

@Component({
   selector: 'slider',
   styleUrls: ['./demo_1/slider.css'],
   animations: [
       trigger('openClose', [
           state('void, closed', style({ height: 0 })),
           state('open', style({ height: '*' })),
           transition('* => *', animate('500ms ease-out'))
       ])
   ],
   template: `
    <div class="container">
     <header (click)="toggle()">
       <ng-content select=".header"></ng-content>
     </header>
     
     <div class="content-container" [@openClose]="open ? 'open' : 'closed'">
       <div class="inner">
          <ng-content select=".content"></ng-content>
          <button (click)="open=false">Close</button>
       </div>
     </div>
     </div>
   `
})
export class Slider {
    @Input('open')
    public open = false;

    toggle() {
        this.open = !this.open;
    }
}
