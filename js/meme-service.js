'use strict'

const gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    {
    txt: '',
    size: 40,
    align: 'left',
    color: '',
    stroke: '',
    pos: {offsetX: 100, offsetY: 100}
    }
    ],

}
   
function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(delta) {
    gMeme.lines[gMeme.selectedLineIdx].size += delta
}

function addLine() {
    const newLine = {
        txt: '',
        size: 40,
        align: 'left',
        color: '',
        stroke: '',
        pos: {offsetX: 100, offsetY: 400} // offsetY should be not specific
    }
    gMeme.lines.push(newLine)
}

function updateSelectedLine() {
    gMeme.selectedLineIdx = 1 // should be base on position x and y of the line
}
