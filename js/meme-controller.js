'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    
    const img = new Image() 
    img.src = `img/${meme.selectedImgId}.jpg` 
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
      
      gCtx.lineWidth = 2
      gCtx.strokeStyle = 'black'
      gCtx.fillStyle = `${meme.lines[meme.selectedLineIdx].color}`
  
      gCtx.font = `${meme.lines[meme.selectedLineIdx].size}px Arial`
      gCtx.fillText(`${meme.lines[meme.selectedLineIdx].txt}`, 100, 100) 
      gCtx.strokeText(`${meme.lines[meme.selectedLineIdx].txt}`, 100, 100) 
    }
}

