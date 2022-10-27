'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function onInit() { 
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
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    gElCanvas.width = (imgHeight * gElCanvas.height) / imgWidth
    // gElCanvas.setAttribute('width', ((imgHeight * gElCanvas.height) / imgWidth)) 
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    
      meme.lines.forEach((line, idx) => {
        const {txt, size, color, stroke, font, pos} = line
        if (meme.selectedLineIdx === idx) {
            gCtx.fillStyle = 'rgba(222, 221, 221, 0.319)'
            gCtx.fillRect(pos.offsetX, pos.offsetY, gCtx.measureText(line.txt).width, gCtx.measureText(line.txt).fontBoundingBoxAscent + gCtx.measureText(line.txt).fontBoundingBoxDescent)
        }
        gCtx.lineWidth = 2
        gCtx.textBaseline = 'top'
        gCtx.strokeStyle = `${stroke}`
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
    
    if (clickedLineIdx === -1) return 
    if (clickedLineIdx !== undefined) {
        updateSelectedLine(clickedLineIdx)
        document.querySelector('.input-txt').value = meme.lines[clickedLineIdx].txt
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
    showEditor()
}

function onSetFontColor(color) {
    setFontColor(color)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)
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

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    const linesCount = countLines()
    let {selectedLineIdx} = getMeme()
    
    updateSelectedLine((selectedLineIdx === linesCount - 1) ? 0 : ++selectedLineIdx)
    renderMeme()
}

function onAlignLine(direction) {
    const meme = getMeme()
    let lineWidth = gCtx.measureText(meme.lines[getSelectedLineIdx()].txt).width
    let offsetX

    switch (direction) {
        case 'left':
            offsetX = 30 
            break
        case 'center':
            offsetX = gElCanvas.width / 2 - lineWidth / 2
            break
        case 'right':
            offsetX = gElCanvas.width - lineWidth - 30
            break
    }
    
    alignLine(offsetX)
    renderMeme()
}

function onDownload(elLink) {
    const memeContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = memeContent
    elLink.download = 'My-Meme' 
}

function showGallery() {
    document.querySelector('.editor-page').classList.add('hidden')
    document.querySelector('.gallery-bar').classList.remove('hidden')
    document.querySelector('.gallery-list').classList.remove('hidden')
    document.querySelector('.about').classList.remove('hidden')
}

function showEditor() {
    document.querySelector('.editor-page').classList.remove('hidden')
    document.querySelector('.gallery-bar').classList.add('hidden')
    document.querySelector('.gallery-list').classList.add('hidden')
    document.querySelector('.about').classList.add('hidden')
}
