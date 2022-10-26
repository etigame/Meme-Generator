'use strict'

function renderGallery() {
    var images = getImages()
    var strHtmls = images.map(({id, url}) => `<img class="img-preview" data-id="${id}" src="${url}" onclick="onImgSelect(this)">`)
    
    document.querySelector('.gallery-list').innerHTML = strHtmls.join('')
}

