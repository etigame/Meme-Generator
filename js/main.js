'use strict'

function onInit() {
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
  
  resizeCanvas()
  addListeners()
  renderGallery()
  renderKeywordsBar()
  renderStickers()
  renderMeme()
}

function getPageWidth() {
  return Math.max(
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function onToggleMenu() {
  const elNav = document.querySelector('.main-nav')
  const elBody = document.querySelector('body')
  const elBtn = document.querySelector('.open-menu-btn')
  const elSearch = document.querySelector('.search')
  const elEditor = document.querySelector('.editor-page')
  const elGalleryBar = document.querySelector('.gallery-bar')
  const elGallery = document.querySelector('.gallery-container')

  const isOpen = elNav.classList.contains('display-menu')

  if (!isOpen) {
    elBody.classList.add('menu-open')
    elNav.classList.add('display-menu')
    elBtn.innerText = 'X'
    elSearch.classList.add('change-z-index')
    elEditor.addEventListener('click', closeMenu)
    elGalleryBar.addEventListener('click', closeMenu)
    elGallery.addEventListener('click', closeMenu)
  } else {
    elBody.classList.remove('menu-open')
    elNav.classList.remove('display-menu')
    elBtn.innerText = '☰'
    elSearch.classList.remove('change-z-index')
  }
}

function closeMenu() {
  const elNav = document.querySelector('.main-nav')
  const elBody = document.querySelector('body')
  const elBtn = document.querySelector('.open-menu-btn')
  const elSearch = document.querySelector('.search')

  elBody.classList.remove('menu-open')
  elNav.classList.remove('display-menu')
  elBtn.innerText = '☰'
  elSearch.classList.remove('change-z-index')
}

function onSetTrans() {
  toggleLang()
  doTrans()
  setDirection()
  renderGallery()
  renderMeme()
}

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')
  console.log(els)
  els.forEach((el) => {
    const transKey = el.dataset.trans
    const trans = getTrans(transKey)
    el.innerText = trans
    if (el.placeholder) el.placeholder = trans
  })
}

function setDirection() {
  const lang = getCurrLang()
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
}
