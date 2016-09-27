import {
    Component,
    Renderer,
    ViewChild,
    HostBinding,
    AnimationPlayer
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_3',
    animations: [routerAnimations('route')],
    styles: [`
      :host {
        background:url(./demo_3/bg.jpg) no-repeat center center / cover;
        cursor:pointer
      }
      .stage {
        position: relative;
        display: block;
        height: 800px;
      }
      .box {
        height:200px;
        width:200px;
        background:url(./demo_3/logo.svg) no-repeat center center / cover;
        background-color:rgba(0,0,0,0.4);
        display:block;
        position: absolute;
        border-radius:50px;
        border:10px solid rgba(0,0,0,0.6);
      }
    `],
    template : `
      <div class="stage" (mousedown)="trackMouse($event)">
        <h1>Animate to MouseDown</h1>
        <div class="box" #box></div>
      </div>
    `
})
export class Demo3 {
  @HostBinding('@route')
  public routeAnimations = true;

  @ViewChild("box") box;
  player : AnimationPlayer;

  _players: AnimationPlayer[] = [];

  constructor(private momentum:Renderer) {}

  ngOnInit() {
      this.trackXY(document.body.offsetWidth / 2 - 110, 200);
  }

  trackXY(x: number, y: number) {
      let boxEl = this.box.nativeElement,
          coords = this.getTopLeft(boxEl);
      let startPos = { left: coords.left, top:coords.top},
          destPos =  { left: x, top:y };

      console.log(`mouseDown: (${destPos.left},${destPos.top})`);

      var oldPlayer = this.player;

      var player = this.momentum.animate( boxEl, null, [
          this.buildAnimationKeyFrame(0, startPos),
          this.buildAnimationKeyFrame(1, destPos)
      ], 500, 0, 'ease-out' );

      player.onDone( ()=>{
          if (this.player !== player) return;
          this._players = [ ];

          boxEl.style.left = destPos.left + 'px';
          boxEl.style.top = destPos.top + 'px';
      });

      this.player = player;
      this._players.push(player);

      if (oldPlayer) {
          oldPlayer.destroy();
      }
      
      player.play();

  }

  trackMouse($event:MouseEvent) {
      this.trackXY($event.pageX, $event.pageY);
  }

  /**
   *
   */
   getTopLeft(boxEl) {
    let coords = boxEl.getBoundingClientRect();
    return { left: coords.left, top:coords.top}
   }
  /**
   * AnimationKeyframe generator for style hashmap
   */
  buildAnimationKeyFrame(offset: number, map:any){
    let _styles = {}
    for (let key in map) {
      _styles[key] = map[key];
    }
    return {
      offset,
      styles : {
        styles : [_styles]
      }
    };
  }

}
