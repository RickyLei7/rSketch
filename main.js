let canvas = document.getElementById('canvas')

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

// line

let ctx = canvas.getContext('2d')
let painting = false
ctx.fillStyle = "black";
ctx.strockStyle = 'none'

canvas.onmousedown = () =>{
  painting = true
}

canvas.onmousemove = (e) => {
  if(painting === true){
    ctx.beginPath()
    ctx.arc(e.clientX, e.clientY, 10, 0 ,2* Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}

canvas.onmouseup = () =>{
  painting = false
}