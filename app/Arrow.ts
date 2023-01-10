import { scale, pcanvas, width, height } from './Canvas';
import { target, drawTarget } from './Target';
import { bowSight, bowCenter } from './Knight'

const bowLaunch = { x: width / 1.25, y: height - (height / 3) }
export let bowPath = { x: bowLaunch.x - scale * 20, y: bowLaunch.y - scale * 20 }

type Arrow = {
  x: number,
  y: number,
  vx: number,
  vy: number,
}

let gravity = scale * 100;
export let arrows: Arrow[] = [
  //{x:10,y:100,vx:100,vy:-100}
];

function updateProjectile(a: Arrow, ms: number) {
  if (bowPath.x <= 0 - 50) {
    return
  }
  bowPath.x += a.vx * ms / 1000;
  bowPath.y += a.vy * ms / 1000;

  a.vy += gravity * ms / 1000;
  if (bowPath.y > height) {
    a.vy *= -0.8;
    bowPath.y = height;
  }


  if (Math.abs(bowPath.x - target.x) < scale * target.size) {
    if (Math.abs(bowPath.y - target.y) < scale * target.size) {
      target.score += 1;
      drawTarget();
    }
  }
}

let ctx = pcanvas.getContext('2d');
let ts = 0;
function animate(t) {
  var elapsed = 0;
  if (ts) {
    elapsed = t - ts;
  }
  ts = t;
  arrows.forEach(
    function(p) {
      updateProjectile(
        p,
        elapsed
      )
    }
  )
  ctx.clearRect(0, 0, width, height);
  arrows.forEach(
    function(p) {
      ctx.beginPath();
      ctx.fillStyle = 'brown'
      ctx.fillRect(bowPath.x, bowPath.y, scale * 50, 10);
      ctx.stroke();
    }
  )
  while (bowPath.x > width + scale * 10) {
    arrows.pop();
    ctx.clearRect(bowPath.x, bowPath.y,scale * 50, 10);
    bowPath={ x: bowLaunch.x - scale * 20, y: bowLaunch.y - scale * 20 };
  }
  while (bowPath.x < 0 - scale * 10){
    arrows.pop();
    ctx.clearRect(bowPath.x, bowPath.y,scale * 50, 10);
    bowPath={ x: bowLaunch.x - scale * 20, y: bowLaunch.y - scale * 20 };
  }
  requestAnimationFrame(animate);
}

