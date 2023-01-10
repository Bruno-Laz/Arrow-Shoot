import {lcanvas, width, height, scale} from './Canvas';
import {arrows,Arrow, bowPath} from './Arrow';
import {animate} from './Animate'

let frame=0

export let ctx = lcanvas.getContext('2d');
export let bowCenter = {x:width/1.25, y:height-(height/3)}
export let bowSight = {x:bowCenter.x-scale*20,y:bowCenter.y - scale*20}


export const img = document.createElement('img'); 
img.src = 'Knight.png'; 
document
  .querySelector('#assets')
  .appendChild(img); 


export const Knight = { 
  img, 
  ready : img.complete, 
  frameWidth : 128,
  frameHeight: 128,
  totalFrames : 8,
  x: bowCenter.x -= 25,
  y: bowCenter.y -= 75,
  draw (x,y,frame,w=null,h=null) { 
    if (!this.ready) {
      setTimeout(
        ()=>this.draw(x,y,frame,w,h),
        100
      )
      console.log('Warning: Image not yet ready...',this.img);
      return
    }
    
    if (!w) {w = this.frameWidth} 
    if (!h) {h = this.frameHeight} 
    frame = frame % this.totalFrames;
     ctx.clearRect(0,0, width,height)
      ctx.drawImage(
        this.img, 
        this.frameWidth * frame, 
        0,
        this.frameWidth, 
        this.frameHeight, 
        x, 
        y, 
        w, 
        h 
      );        
  },
  animate(){
    lcanvas.addEventListener(
      'mousedown',
      function (){
        window.requestAnimationFrame(animate)
      }
    )
    lcanvas.addEventListener(
      'mouseup',
      function(){
      frame=0
      }
    )
  }
}


img.addEventListener('load',()=>{
  console.log('Image is loaded!');
  Knight.ready=true
});



export function drawArrow (x,y) {
  ctx.beginPath();
  ctx.lineWidth = 3*scale;
  ctx.moveTo(bowPath.x,bowPath.y)
  ctx.lineTo(x,y);
  ctx.stroke();
}

lcanvas.addEventListener(
  'mousemove',
  function (evt) {
    if (evt.buttons==1) {
      Knight.draw(Knight.x,Knight.y,frame);
      let x = -evt.offsetX;
      if (x < width/2) {
        x = width/2;
      }
      drawArrow(x,evt.offsetY)
    }
  }
)

lcanvas.addEventListener(
  "mouseup",
  function (evt) {    
    let vx = 8* (bowSight.x - evt.offsetX);
    let vy = 1.9* -(bowSight.y - evt.offsetY);
    arrows.push(
      {
        x : evt.offsetX,
        y : evt.offsetY,
        vx, vy
      }
    );
    Knight.draw(Knight.x,Knight.y,frame);
  }
)

Knight.animate()
