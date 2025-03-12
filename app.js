
let canvas=document.querySelector("canvas");
let ctx= canvas.getContext("2d");

let cellsize=50;
let boardwidth=600;
let boardheight=500;

let 
snakeCells=[[0,0],[50,0]];
let gameover=false;

let direction="right";

let foodcells= generaterandomfood();
let score=0;

document.addEventListener("keydown",function(event)
{
    if (event.key==="ArrowUp")
        {
          direction="up";
        }
        else  if (event.key==="ArrowDown")
            {
                direction="down";
            }
            else  if (event.key==="ArrowLeft")
                {
                    direction="left";
                }

                else if (event.key==="ArrowRight")
                    {
                        direction="right";
                    }
})

function draw()
{

    if (gameover===true)
        {
            clearInterval(id);
            ctx.fillStyle="red";
            ctx.font="30px monospace"
            ctx.fillText("GAME OVER!!",430,400)
            return ;
        }
    ctx.clearRect(0,0,1200,800);

  for(let cell of snakeCells)
    {
        ctx.fillStyle="brown";
        ctx.fillRect(cell[0], cell[1], cellsize,cellsize);
        ctx.strokeStyle="golden";
        ctx.strokeRect(cell[0],cell[1],cellsize,cellsize);
    }

    ctx.fillStyle="orange";
    ctx.fillRect(foodcells[0],foodcells[1],cellsize,cellsize);

    ctx.fillText(`Score: ${score}`,20,30)
    ctx.font="20px monospace";


}

function update()
{
  let headX= snakeCells[snakeCells.length-1][0];
  let headY= snakeCells[snakeCells.length-1][1];
  let newHeadX;
  let newHeadY;

  if (direction==="up")
    {
   newHeadX= headX;
   newHeadY=headY-cellsize;
   if(newHeadY<0 ||  ex(newHeadX, newHeadY))
    {
        gameover=true
    }
    }
    else if (direction==="down")
        {
            newHeadX= headX;
            newHeadY=headY+cellsize;
            if(newHeadY===boardheight ||  ex(newHeadX, newHeadY))
                {
                    gameover=true
                }
        }
        else if (direction==="left")
            {
                newHeadX= headX-cellsize;
                newHeadY=headY;
                if(newHeadX<0 ||  ex(newHeadX, newHeadY))
                    {
                        gameover=true
                    }
            }
            else if(direction==="right")
                {
                    newHeadX= headX+cellsize;
                    newHeadY=headY;
                    if(newHeadX===boardwidth || ex(newHeadX, newHeadY) )
                        {
                            gameover=true;
                        }
                  
                }
  snakeCells.push([newHeadX, newHeadY]);

  if (newHeadX === foodcells[0] && newHeadY===foodcells[1])
    {
        foodcells= generaterandomfood();
        score+=1;
    }
    else{
  snakeCells.shift();
    }
}

function generaterandomfood()
{
    return [
        Math.round(Math.random()*(boardwidth-cellsize)/cellsize)*cellsize,
        Math.round(Math.random()*(boardheight-cellsize)/cellsize)*cellsize
    ]
}

function ex(newHeadX, newHeadY)
{
  for(let item of snakeCells)
  {
    if(item[0]=== newHeadX && item[1]=== newHeadY )
        {
            return true;
        }
  }
  return false;
}


let id= setInterval(function()
{
   update()
   draw()
},100)


