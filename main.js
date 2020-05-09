let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let eraserEnable = false
let lineWidth = 5

autoSetCanvasSize(canvas)
color()
listenToUser(canvas)
actions()

/*********************************************************/

function drawLine(beginX, beginY, endX, endY) {
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.lineWidth = lineWidth
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
}

function actions() {
  pencil.onclick = function () {
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')

  }
  eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
  }
  clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  download.onclick = function () {
    let url = canvas.toDataURL('imag/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'My Drawing'
    a.target = '_blank'
    a.click()
  }
}

function color() {
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

  thin.onclick = function () {
    lineWidth = 5
  }

  thick.onclick = function () {
    lineWidth = 150
  }

}

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }
}

function listenToUser(canvas) {
  let lastPoint = {x: undefined, y: undefined}
  let isTouchDevice = 'ontouchstart' in document.documentElement
  let painting = false
  if (isTouchDevice) {
    // Touch Device
    canvas.ontouchstart = (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        lastPoint = [x, y]
      }
    }
    canvas.ontouchmove = (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        let newPoint = [x, y]
        console.log(lastPoint, newPoint)
        drawLine(lastPoint[0], lastPoint[1], newPoint[0], newPoint[1])
        lastPoint = newPoint
      }

    }
  } else {
    // Not Touch Device
    canvas.onmousedown = (e) => {
      let x = e.clientX
      let y = e.clientY
      painting = true
      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        lastPoint = [x, y]
      }
    }
    canvas.onmousemove = (e) => {
      let x = e.clientX
      let y = e.clientY
      if (!painting) {return}
      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10)
      } else {
        let newPoint = [x, y]
        drawLine(lastPoint[0], lastPoint[1], newPoint[0], newPoint[1])
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = () => {
      painting = false
    }
  }

}






