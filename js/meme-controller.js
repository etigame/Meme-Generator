'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gStartPos

function getCanvas() {
  return gElCanvas
}

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.src = `img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line, idx) => {
      const { txt, size, color, stroke, font, pos, id } = line
      // if (line.pos.offsetY === null) {line.pos.offsetY = gElCanvas.height - 50}
      

      if (meme.selectedLineIdx === idx) {
        gCtx.strokeStyle = 'rgb(255, 127, 0)'
        gCtx.strokeRect(
          pos.offsetX - 10,
          pos.offsetY - 10,
          gCtx.measureText(line.txt).width + 20,
          gCtx.measureText(line.txt).fontBoundingBoxAscent +
            gCtx.measureText(line.txt).fontBoundingBoxDescent +
            20
        )
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
      resizeCanvas()
      renderMeme()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const meme = getMeme()

  // check if the click was on any line and returns it's idx
  const clickedLineIdx = meme.lines.findIndex((line) => {
    return (
      pos.x > line.pos.offsetX &&
      pos.x < line.pos.offsetX + gCtx.measureText(line.txt).width &&
      pos.y > line.pos.offsetY &&
      pos.y <
        line.pos.offsetY + 
          gCtx.measureText(line.txt).fontBoundingBoxAscent +
          gCtx.measureText(line.txt).fontBoundingBoxDescent
    )
  })

  if (clickedLineIdx === -1) {
    updateSelectedLine('')
    document.querySelector('.input-txt').value = ''
    renderMeme()
    return
  }
  if (clickedLineIdx !== undefined) {
    updateSelectedLine(clickedLineIdx)
    document.querySelector('.input-txt').value = meme.lines[clickedLineIdx].txt
  }

  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grab'

  renderMeme()
}

function onMove(ev) {
  const { isDrag } = getSelectedLine()
  if (!isDrag) return
  const pos = getEvPos(ev)

  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)

  gStartPos = pos

  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
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
  document.querySelector('.btn-font-color').style.color = `${color}`
  renderMeme()
}

function onSetStrokeColor(color) {
  setStrokeColor(color)
  document.querySelector('.btn-stroke-color').style.color = `${color}`
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

function onAddLine(sticker) {
  let linesCounter = countLines()
  updateSelectedLine(linesCounter)
  addLine(++linesCounter, sticker)
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onSwitchLine() {
  const linesCount = countLines()
  let { selectedLineIdx } = getMeme()

  updateSelectedLine(selectedLineIdx === linesCount - 1 ? 0 : ++selectedLineIdx)
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
  document.querySelector('.saved-memes-page').classList.add('hidden')
  renderGallery()
  renderKeywordsBar()
}

function showEditor() {
  document.querySelector('.gallery-bar').classList.add('hidden')
  document.querySelector('.gallery-list').classList.add('hidden')
  document.querySelector('.about').classList.add('hidden')
  document.querySelector('.editor-page').classList.remove('hidden')
  document.querySelector('.saved-memes-page').classList.add('hidden')
  renderStickers()
}

function showSavedMemes() {
  document.querySelector('.gallery-bar').classList.add('hidden')
  document.querySelector('.gallery-list').classList.add('hidden')
  document.querySelector('.about').classList.add('hidden')
  document.querySelector('.editor-page').classList.add('hidden')
  document.querySelector('.saved-memes-page').classList.remove('hidden')
  renderSavedMemes()
}

function renderSavedMemes() {
  const savedMemes = loadFromStorage(SAVED_MEMES_STORAGE_KEY)
  const strHtmls = savedMemes.map(({selectedImgId}) => `<img class="img-preview" data-id="${selectedImgId}" src="${url}" onclick="onImgSelect(this)">`)
    
  document.querySelector('.saved-memes-page').innerHTML = strHtmls.join('')
}

function resizeCanvas() {
  gElCanvas = document.getElementById('my-canvas')
  gElCanvas.width = gElCanvas.offsetWidth
  gElCanvas.height = gElCanvas.offsetHeight

  const pageWidth = getPageWidth()
  console.log(pageWidth);
  if (pageWidth > 1080) {
    gElCanvas.width = 450
    gElCanvas.height = 450
  }
  if (pageWidth < 1080 && pageWidth > 780) {
    gElCanvas.width = 400
    gElCanvas.height = 400
  }
  if (pageWidth < 480) {
    gElCanvas.width = pageWidth * 0.95
    gElCanvas.height = pageWidth * 0.95
  }
}

function onSaveMeme() {
  saveMeme()
  showSavedMemes()
  renderSavedMemes()
}

async function onShareCanvas() {
  const dataUrl = gElCanvas.toDataURL()
  const blob = await (await fetch(dataUrl)).blob()
  const filesArray = [
    new File([blob], 'myMeme.png', {
      type: blob.type,
      lastModified: new Date().getTime(),
    }),
  ]
  const shareData = {
    files: filesArray,
  }
  navigator.share(shareData)
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
  showEditor()
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (ev) {
    let img = new Image()
    img.onload = onImageReady.bind(null, img)
    img.src = ev.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onAddSticker(sticker) {
  onAddLine(sticker)
}
