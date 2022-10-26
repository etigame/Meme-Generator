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
    align: 'left',
    color: '',
    stroke: '',
    font: 'impact',
    pos: {offsetX: 50, offsetY: 100}
    }
    ],

}
   
function getMeme() {
    return gMeme
}

function getPosY(lineId) {
    let posY 
    switch (lineId) {
        case 1:
            posY = 100
            break
        case 2: 
            posY = 400
            break
        default:
            posY = 250
    } 
    return posY
}

function countLines() {
    return gMeme.lines.length
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    saveMemeToStorage()
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    saveMemeToStorage()
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
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
        align: 'left',
        color: '',
        stroke: '',
        font: 'impact',
        pos: {offsetX: 50, offsetY: getPosY(lineId)} // offsetY should be not specific
    }
    gMeme.lines.push(newLine)
    saveMemeToStorage()
}

function updateSelectedLine(lineId) {
    gMeme.selectedLineIdx = lineId 
    saveMemeToStorage()
}

function saveMemeToStorage() {
    saveToStorage(GMEME_STORAGE_KEY, gMeme)
}