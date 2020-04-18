let canvas = document.querySelector('#canvas')

canvas.onclick = (e) =>{
  console.log(e.clientX)
  console.log(e.clientY)

  let div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.left = e.clientX + 'px'
  div.style.top = e.clientY + 'px'
  div.style.border = '1px solid red'
  div.style.width = '5px'
  div.style.height = '5px'
  canvas.appendChild(div)

}