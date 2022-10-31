'use strict'

const elStickersList = document.querySelector('.stickers-list')
const elSticker = document.querySelector('.sticker-preview')

function renderStickers() {
    const stickers = getStickers()
    var strHtmls = stickers.map(sticker => `
    <li class="sticker-preview" onclick="onAddSticker(this.innerText)">${sticker}</li>
    `
    )
    document.querySelector('.stickers-list').innerHTML = strHtmls.join('')
}