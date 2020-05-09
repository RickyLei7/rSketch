let canvas = document.getElementById('canvas')

autoSetCanvasSize(canvas)


black.onclick = function () {
  // ctx.fillStyle = 'red'
  ctx.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')

}
red.onclick = function () {
  // ctx.fillStyle = 'red'
  ctx.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}
yellow.onclick = function () {
  // ctx.fillStyle = 'red'
  ctx.strokeStyle = 'yellow'
  yellow.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  // ctx.fillStyle = 'red'
  ctx.strokeStyle = 'blue'
  blue.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
}


function autoSetCanvasSize(canvas){
  setCanvasSize()
  window.onresize = function (){
    setCanvasSize()
  }
  function setCanvasSize() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }
}

let ctx = canvas.getContext('2d')
let painting = false
ctx.fillStyle = "black";
// ctx.strockStyle = 'none'

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
}

let isTouchDevice = 'ontouchstart' in document.documentElement
let last
if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0], last[1], x, y)
    last = [x, y]
  }
} else {
  canvas.onmousedown = (e) => {
    painting = true
    last = [e.clientX, e.clientY]
  }

  canvas.onmousemove = (e) => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }

  canvas.onmouseup = () => {
    painting = false
  }
}



