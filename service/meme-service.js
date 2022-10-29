'use strict'

const GMEME_STORAGE_KEY = 'gMeme_db'

const gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    {
    id: 1,
    txt: '',
    size: 40,
    color: 'white',
    stroke: 'black',
    font: 'impact',
    pos: {offsetX: 30, offsetY: 100}
    }
    ],
}
   
function getMeme() {
    return gMeme
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getPosY(lineId) {
    let posY 
    switch (lineId) {
        case 1:
            posY = 50
            break
        case 2: 
            posY = 400
            break
        default:
            posY = 250
    } 
    return posY
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function countLines() {
    return gMeme.lines.length
}

function setLineTxt(txt) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    saveMemeToStorage()
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    saveMemeToStorage()
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    saveMemeToStorage()
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
    saveMemeToStorage()
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
    saveMemeToStorage()
}

function changeFontSize(delta) {
    gMeme.lines[gMeme.selectedLineIdx].size += delta
    saveMemeToStorage()
}

function addLine(lineId) {
    const newLine = {
        id: lineId,
        txt: '',
        size: 40,
        // align: 'left',
        color: '',
        stroke: '',
        font: 'impact',
        pos: {offsetX: 50, offsetY: getPosY(lineId)} 
    }
    gMeme.lines.push(newLine)
    saveMemeToStorage()
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    saveMemeToStorage()
}

function updateSelectedLine(lineId) {
    gMeme.selectedLineIdx = lineId 
    saveMemeToStorage()
}

function alignLine(offsetX) {
    gMeme.lines[gMeme.selectedLineIdx].pos.offsetX = offsetX
    saveMemeToStorage()
}

function saveMemeToStorage() {
    saveToStorage(GMEME_STORAGE_KEY, gMeme)
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    saveMemeToStorage()
  }

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.offsetX += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.offsetY += dy
}