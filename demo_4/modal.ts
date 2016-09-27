import {
    Component,
    EventEmitter,
    Output,
    trigger,
    state,
    transition,
    keyframes,
    group,
    animate,
    query,
    group,
    style,
    sequence,
    HostBinding,
    HostListener
} from '@angular/core';

@Component({
    selector: 'modal',
    styleUrls: ['demo_4/modal.css'],
    template: `
      <div class="modal-frame" @showScreen></div>
      <div class="modal-container" @showModal>
        <header #header>Header</header>
        <div #body class="body">
            <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis mauris magna. Cras dictum eros odio, nec aliquam purus fringilla et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dolor erat, accumsan ut purus vitae, convallis euismod ante. Cras non sollicitudin sapien, in tincidunt velit. Sed viverra, nulla in rhoncus facilisis, ante dui pharetra nisl, non bibendum turpis tellus eu odio. Sed posuere velit sem, posuere pulvinar metus dignissim ac. Maecenas ultricies neque id ante semper, sit amet placerat metus aliquam. Aliquam tortor mi, commodo porta nulla nec, gravida iaculis lacus. Vivamus ut ligula non quam semper condimentum. Mauris at viverra tortor, non gravida massa.
           </p>
            <p>
Mauris id pharetra dui. In hac habitasse platea dictumst. Sed sed leo vel leo facilisis scelerisque sit amet ut dolor. Aenean feugiat, sapien sed pulvinar porta, eros enim cursus urna, nec facilisis metus leo nec leo. Aenean bibendum lacus diam, in porttitor ex facilisis vel. Etiam et nibh massa. Nam eu ex et nisl cursus iaculis at sed velit. Aenean finibus, felis eu venenatis tempor, quam ante efficitur augue, a mattis ipsum elit eu lectus. Donec dolor neque, feugiat sit amet pretium eget, tempus ut ligula. In libero erat, commodo ac ex a, feugiat sagittis arcu. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam sapien. Praesent porta, odio vel rhoncus blandit, eros ante ultrices ex, sit amet scelerisque eros sapien sed sapien. Nulla eu justo sem. Vestibulum non accumsan nulla, feugiat ultrices tellus. Nam auctor, urna in consequat vulputate, mi tortor sollicitudin mi, vel elementum nulla elit ac elit.
            </p>
        </div>
        <footer #footer>
            footer 
        </footer>
        <button #close (click)="close()" class="close-button">X</button>
      </div>  
    `,
    animations: [
        trigger('showScreen', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ])
        ]),
        trigger('showModal', [
            transition('void => *', [
                group([
                    style({ opacity: 0 }),
                    query('header', style({ opacity: 0 })),
                    query('body', style({ opacity: 0 })),
                    query('footer', style({ opacity: 0 })),
                    query('close', style({ opacity: 0 }))
                ]),
                group([
                    style({ height: 200, width: '30%', transform: 'translateX(-50%) translateY(-70%)' }),
                    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(-50%) translateY(-50%)' })),
                    query('header', [
                        animate('0.8s 150ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity:1, offset: 1 })
                        ]))
                    ]),
                    query('body', [
                        animate('0.8s 400ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity: 1, offset: 1 })
                        ]))
                    ]),
                    query('footer', [
                        animate('0.8s 500ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity: 1, offset: 1 })
                        ]))
                    ]),
                    query('close', [
                        animate('0.5s 400ms', keyframes([
                            style({ opacity: 0, transform: 'scale(1.2)', offset: 0 }),
                            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
                        ]))
                    ]),
                    animate('500ms cubic-bezier(.29,.55,.53,1.53)', style({ height: '*', width: '*' })),
                ]),
            ])
        ])
    ]
})
export class Modal {
    @Output("close")
    closeEvent = new EventEmitter();

    close() {
        this.closeEvent.next();
    }
}