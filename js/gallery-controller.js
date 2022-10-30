'use strict'

function renderGallery() {
    const images = getImages()
    const strHtmls = images.map(({id, url}) => `<img class="img-preview" data-id="${id}" src="${url}" onclick="onImgSelect(this)">`)
    
    document.querySelector('.gallery-list').innerHTML = strHtmls.join('')
}

function onSetFilter(txt) {
    setFilter(txt)
    renderGallery()
    document.querySelector('.search-keyword').value = ''
}