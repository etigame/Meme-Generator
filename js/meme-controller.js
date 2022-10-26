'use strict'

let gElCanvas
let gCtx

function onInit() { //should be on main.js?
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    
    const img = new Image() 
    img.src = `img/${meme.selectedImgId}.jpg` 
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
      
      meme.lines.forEach((line, idx) => {
        const {txt, size, align, color, stroke, pos} = line
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = `${color}`
        gCtx.font = `${size}px impact`
        gCtx.fillText(txt, pos.offsetX, pos.offsetY) 
        gCtx.strokeText(txt, pos.offsetX, pos.offsetY) 
      })
    }
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(img) {
    setImg(img.getAttribute('data-id'))
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeFontSize(delta) {
    changeFontSize(delta)
    renderMeme()
}

function onAddLine() {
    let linesCounter = countLines()
    updateSelectedLine(linesCounter)
    addLine(++linesCounter)
    document.querySelector('.input-txt').value = ''
    renderMeme()
}

function onSwitchLine() {
    updateSelectedLine()
}

function onSelecetLine() {
    //when user clicks the line on the canvas
    //selectLine in the service updates the gmeme.selectedline
}