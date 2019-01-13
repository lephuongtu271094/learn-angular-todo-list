import { trigger, state, style, transition, animate } from '@angular/animations';

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
    state('active', style({
        fontSize: '18px',
        color: 'black'
    })),
    state('completed', style({
        fontSize: '17px',
        color: 'lightgrey',
        textDecoration: 'line-through'
    })),
    transition('active <=> completed', [animate(250)])
])

export {
    fadeStrikeThroughAnimation
}