'use strict'

const GMEME_STORAGE_KEY = 'gMeme_db'
const SAVED_MEMES_STORAGE_KEY = 'saved_memes_db'

let gMeme 

// {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//     {
//     id: 1,
//     txt: 'Type something here...',
//     size: 40,
//     color: 'white',
//     stroke: 'black',
//     font: 'impact',
//     pos: {offsetX: 30, offsetY: 50}
//     }, 
//     {
//     id: 2,
//     txt: 'You can also here',
//     size: 40,
//     color: 'white',
//     stroke: 'black',
//     font: 'impact',
//     pos: {offsetX: 30, offsetY: 400}
//     }
//     ],
// }

const gSavedMemes = []
   
function getMeme() {
    return gMeme
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getPosY(lineId) {
    let canvas = getCanvas()

    let posY 
    switch (lineId) {
        case 1:
            posY = (canvas.width * 0.08)
            break
        case 2: 
            posY = canvas.height - (canvas.width * 0.2)
            break
        default:
            posY = (canvas.width * 0.5)
    } 
    return posY
}

function createMeme() {
    let canvas = getCanvas()

    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
        {
        id: 1,
        txt: 'Type something here...',
        size: canvas.width * 0.1,
        color: 'white',
        stroke: 'black',
        font: 'impact',
        pos: {offsetX: (canvas.width * 0.08), offsetY: (canvas.width * 0.08)}
        }, 
        {
        id: 2,
        txt: 'You can also here',
        size: canvas.width * 0.1,
        color: 'white',
        stroke: 'black',
        font: 'impact',
        pos: {offsetX: (canvas.width * 0.08), offsetY: canvas.height - (canvas.width * 0.2)}
        }
        ],
        
    }
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
    gMeme = createMeme()
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

function addLine(lineId, sticker) {
    let canvas = getCanvas()

    const newLine = {
        id: lineId,
        txt: `${sticker ? sticker : 'Type something here'}`,
        size: canvas.width * 0.1,
        color: 'white',
        stroke: 'black',
        font: 'impact',
        pos: {offsetX: (canvas.width * 0.08), offsetY: getPosY(lineId)} 
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

function saveMeme() {
    gSavedMemes.unshift(gMeme)
    saveToStorage(SAVED_MEMES_STORAGE_KEY, gSavedMemes)
}

// function getSavedMemes() {
//     return gSavedMemes
// }
