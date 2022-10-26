'use strict'

function renderGallery() {
    var images = getImages()
    var strHtmls = images.map(img => `<img class="img-preview" data-id="${img.id}" src="${img.url}" onclick="onImgSelect(this)">`)
    
    document.querySelector('.gallery-list').innerHTML = strHtmls.join('')
}

function onImgSelect(img) {
    setImg(img.getAttribute('data-id'))
    renderMeme()
}