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

function renderKeywordsBar() {
    const keywords = getKeywords()
    const strHtmls = keywords.map(({keyword, size}) => `
        <p style="font-size: ${size}px" onclick="onSelectKeyword(this.innerText)">${keyword}</p>
        `
    )
    
    document.querySelector('.keywords-bar').innerHTML = strHtmls.join('')
}

function onSelectKeyword(keyword) {
    selectKeyword(keyword)
    setFilter(keyword)
    renderKeywordsBar()
    renderGallery()
}