import {
    Component,
} from '@angular/core';

@Component({
    selector: 'demo-app',
    styles: [`
        .main-navigation {
            position:fixed;
            top:-40px;
            left:50%;
            transform:translateX(-50%);
            border:5px solid rgba(255,255,255,0.3);
            border-top:0;
            z-index:10000;
            transition:0.5s ease-out;
        }
        .main-navigation:hover {
            top:0; 
        }
        .main-navigation a {
            padding:10px 15px;
            display:inline-block;
            font-size:2rem;
            color:white!important;
        }
        .main-navigation a.one:hover {
            background:#0092B2;
        }
        .main-navigation a.two:hover {
            background:#776045;
        }
        .main-navigation a.three:hover {
            background:#A8C545;
        }
        .main-navigation a.four:hover {
            background:#DFD3B6;
        }
    `],
    template: `
        <nav class="main-navigation">
            <a class="one" routerLink="/demo1">1</a>
            <a class="two" routerLink="/demo2">2</a>
            <a class="three" routerLink="/demo3">3</a>
            <a class="four" routerLink="/demo4">4</a>
        </nav>
        
        <router-outlet></router-outlet>
    `
})
export class DemoApp {
}
