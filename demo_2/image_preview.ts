import {ChangeDetectorRef, Input, Component, animate, style, trigger, state, transition} from "@angular/core";

@Component({
    selector: 'image-preview',
    styleUrls: ['./demo_2/image-preview.css'],
    animations: [
        trigger('loading', [
            state('*', style({ opacity: 0 })),
            state('loading', style({
                position: 'absolute',
                top:0,
                left:0,
                right:0,
                height:'100%',
                backgroundColor: 'rgba(255,255,255,0.8)'
            })),
            transition('* => loading', [
                style({
                    opacity: 0,
                    position: 'absolute',
                    top:0,
                    left:0,
                    right:0,
                    height:'100%'
                }),
                animate(300, style({
                    opacity: 1
                })),
                animate("0.3s 0.1s")
            ]),
            transition('loading => *', [
                animate(500, style({
                    opacity: 0
                }))
            ])
        ])
    ],
    template: `
       <div class="loading-container"
            [@loading]="status"
            (@loading.done)="loadingStageReady()"></div>
       <img [attr.src]="activeImage" />
    `
})
export class ImagePreview {
    private _nextImage;
    private _activeImage;
    public status;

    constructor(public ref: ChangeDetectorRef) {
    }

    @Input('activeImage')
    set activeImage(image) {
        this.status = 'loading';
        this._nextImage = image;
    }

    get activeImage() {
        return this._activeImage;
    }

    loadingStageReady() {
       downloadImage(this._nextImage, () => {
           this._activeImage = this._nextImage;
           this._nextImage = null;
           this.status = null;
           // TODO: remove this after 2.0.2 fix
           this.ref.detectChanges();
       });
    }
}

// this is to ensure the image is preloaded in
// time for when the image src is changed such that
// a flicker effect won't happen
function downloadImage(url, fn) {
    var img = new Image();
    img.onload = () => {
        setTimeout(fn, 300);
    };
    img.src = url;
}
