'use strict'

const elStickersList = document.querySelector('.stickers-list')
const elSticker = document.querySelector('.sticker-preview')
// const prevButton = document.querySelector('.slide-arrow-prev')
// const nextButton = document.querySelector('.slide-arrow-next')

// nextButton.addEventListener('click', (event) => {
//     const slideWidth = elSticker.clientWidth;
//       elStickersList.scrollLeft += slideWidth;
//   });

// prevButton.addEventListener('click', () => {
//     const slideWidth = elSticker.clientWidth;
//     elStickersList.scrollLeft -= slideWidth;
//   });

function renderStickers() {
    const stickers = getStickers()
    var strHtmls = stickers.map(sticker => `
    <li class="sticker-preview" onclick="onAddSticker()">${sticker}</li>
    `
    )
    document.querySelector('.stickers-list').innerHTML = strHtmls.join('')
}