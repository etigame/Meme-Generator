'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}


function renderMeme() {
    const img = new Image() 
    img.src = 'img/2.jpg' 
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
      
      gCtx.lineWidth = 2
      gCtx.strokeStyle = 'black'
      gCtx.fillStyle = 'white'
  
      gCtx.font = '40px Arial'
      gCtx.fillText('hello world', 100, 100) 
      gCtx.strokeText('hello world', 100, 100) 
    }

}

