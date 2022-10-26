'use strict'

const gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    {
    txt: '',
    size: 40,
    align: 'left',
    color: 'red'
    }
    ]
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
