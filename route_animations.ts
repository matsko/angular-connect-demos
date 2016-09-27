import {
    trigger,
    animate,
    style,
    transition
} from '@angular/core';

var startingStyles = (styles) => {
    styles['position'] = 'fixed';
    styles['top'] = 0;
    styles['left'] = 0;
    styles['right'] = 0;
    styles['height'] = '100%';
    return styles;
}

export default function(name) {
    return trigger(name, [
        transition('void => *', [
            style(startingStyles({
                transform: 'translateX(100%)'
            })),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)'}))
        ]),
        transition('* => void', [
            style(startingStyles({
                transform: 'translateX(0%)'
            })),
            animate('0.5s ease-in', style({ transform: 'translateX(-100%)'}))
        ])
    ]);
}
