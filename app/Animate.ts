import {lcanvas} from './Canvas'
import {Knight,ctx, drawArrow} from './Knight'
let frame = 0
let currentFrame= 0
const frameStagger = 20

export function animate(){
  ctx.clearRect(Knight.x,Knight.y,128,128)
  update()
  Knight.draw(Knight.x,Knight.y,frame)
  window.requestAnimationFrame(animate)
}


function update(){
  if (currentFrame % frameStagger == 0){
    if (frame < 5){ frame += 1}
  }
  currentFrame += 1 
  lcanvas.addEventListener
(
    'mouseup',
  function(){
    frame=0;
    currentFrame=0;
    
  }
)
}