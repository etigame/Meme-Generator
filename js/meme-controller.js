'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function onInit() { //should be on main.js?
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()
    addListeners()
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
        const {txt, size, align, color, stroke, font, pos} = line
        if (meme.selectedLineIdx === idx) {
            gCtx.fillStyle = 'rgba(222, 221, 221, 0.319)'
            gCtx.fillRect(pos.offsetX, pos.offsetY, gCtx.measureText(line.txt).width, gCtx.measureText(line.txt).fontBoundingBoxAscent + gCtx.measureText(line.txt).fontBoundingBoxDescent)
        }
        gCtx.lineWidth = 2
        gCtx.textBaseline = 'top'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = `${color}`
        gCtx.font = `${size}px ${font}`
        gCtx.fillText(txt, pos.offsetX, pos.offsetY) 
        gCtx.strokeText(txt, pos.offsetX, pos.offsetY) 
      })
    }
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
    //   resizeCanvas()
    //   renderCanvas()
    })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}
  
function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const meme = getMeme()

    // check if the click was on any line and returns it's idx
    const clickedLineIdx = meme.lines.findIndex(line => {
        return pos.x > line.pos.offsetX && pos.x < line.pos.offsetX + gCtx.measureText(line.txt).width 
        &&
          pos.y > line.pos.offsetY && pos.y < line.pos.offsetY  + gCtx.measureText(line.txt).fontBoundingBoxAscent + gCtx.measureText(line.txt).fontBoundingBoxDescent;
    })
    
    if (clickedLineIdx !== undefined) {
        updateSelectedLine(clickedLineIdx)
    }
      
    renderMeme()
}

function getEvPos(ev) {
    const pos = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {
      ev.preventDefault()
      ev = ev.changedTouches[0]
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
    }

    return pos
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
    const linesCount = countLines()
    let {selectedLineIdx} = getMeme()
    
    updateSelectedLine((selectedLineIdx === linesCount - 1) ? 0 : ++selectedLineIdx)
    renderMeme()
}

function onSelecetLine() {
    //when user clicks the line on the canvas
    //selectLine in the service updates the gmeme.selectedline
}

// on mouse doun >> if clicked line, else return >> gmeme.lines.is selected? >> render with color 