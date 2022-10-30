'use strict'

const gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['all','funny', 'happy']},
    {id: 2, url: 'img/2.jpg', keywords: ['all','animal', 'happy']},
    {id: 3, url: 'img/3.jpg', keywords: ['all','happy', 'animal', 'kids']},
    {id: 4, url: 'img/4.jpg', keywords: ['all','animal', 'funny']},
    {id: 5, url: 'img/5.jpg', keywords: ['all','kids', 'funny']},
    {id: 6, url: 'img/6.jpg', keywords: ['all','funny', 'happy']},
    {id: 7, url: 'img/7.jpg', keywords: ['all','funny', 'kids']},
    {id: 8, url: 'img/8.jpg', keywords: ['all','funny', 'happy']},
    {id: 9, url: 'img/9.jpg', keywords: ['all','funny', 'kids']},
    {id: 10, url: 'img/10.jpg', keywords: ['all','funny', 'happy']},
    {id: 11, url: 'img/11.jpg', keywords: ['all','funny', 'sad']},
    {id: 12, url: 'img/12.jpg', keywords: ['all','sad', 'funny']},
    {id: 13, url: 'img/13.jpg', keywords: ['all','funny', 'happy']},
    {id: 14, url: 'img/14.jpg', keywords: ['all','sad', 'funny']},
    {id: 15, url: 'img/15.jpg', keywords: ['all','funny', 'sad']},
    {id: 16, url: 'img/16.jpg', keywords: ['all','funny', 'happy']},
    {id: 17, url: 'img/17.jpg', keywords: ['all','funny', 'sad']},
    {id: 18, url: 'img/18.jpg', keywords: ['all','sad', 'kids']},
];

let gFilterBy 

function getImages() { 
    if (gFilterBy !== undefined) {
        let images = gImgs.filter(image => image.keywords.includes(gFilterBy))
        return images
    }
    return gImgs
}

function setFilter(txt) {
    gFilterBy = txt
}