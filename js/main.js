'use strict'

function onToggleMenu() {
    const elNav = document.querySelector('.main-nav')
    const elBody = document.querySelector('body')
    const elBtn = document.querySelector('.open-menu-btn')
  
    const isOpen = elNav.classList.contains('display-menu')
  
    if (!isOpen) {
      elBody.classList.add('menu-open')
      elNav.classList.add('display-menu')
      elBtn.innerText = 'X'
    } else {
      elBody.classList.remove('menu-open')
      elNav.classList.remove('display-menu')
      elBtn.innerText = '☰'
    }
  }