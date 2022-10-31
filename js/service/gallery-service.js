'use strict'

const gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['all','funny', 'happy', 'politic']},
    {id: 2, url: 'img/2.jpg', keywords: ['all','animals', 'happy']},
    {id: 3, url: 'img/3.jpg', keywords: ['all','happy', 'animals', 'kids']},
    {id: 4, url: 'img/4.jpg', keywords: ['all','animals', 'funny']},
    {id: 5, url: 'img/5.jpg', keywords: ['all','kids', 'funny', 'bad']},
    {id: 6, url: 'img/6.jpg', keywords: ['all','funny', 'happy', 'celeb']},
    {id: 7, url: 'img/7.jpg', keywords: ['all','funny', 'kids']},
    {id: 8, url: 'img/8.jpg', keywords: ['all','funny', 'happy', 'bad']},
    {id: 9, url: 'img/9.jpg', keywords: ['all','funny', 'kids', 'bad']},
    {id: 10, url: 'img/10.jpg', keywords: ['all','funny', 'happy', 'politic']},
    {id: 11, url: 'img/11.jpg', keywords: ['all','funny', 'sad']},
    {id: 12, url: 'img/12.jpg', keywords: ['all','sad', 'funny', 'celeb']},
    {id: 13, url: 'img/13.jpg', keywords: ['all','funny', 'happy', 'celeb']},
    {id: 14, url: 'img/14.jpg', keywords: ['all','sad', 'funny', 'celeb']},
    {id: 15, url: 'img/15.jpg', keywords: ['all','funny', 'sad', 'celeb']},
    {id: 16, url: 'img/16.jpg', keywords: ['all','funny', 'happy', 'celeb']},
    {id: 17, url: 'img/17.jpg', keywords: ['all','funny', 'sad', 'politic', 'bad']},
    {id: 18, url: 'img/18.jpg', keywords: ['all','sad', 'kids']},
    {id: 19, url: 'img/19.jpg', keywords: ['all','funny', 'bad', 'celeb']},
    {id: 20, url: 'img/20.jpg', keywords: ['all', 'sad', 'kids', 'bad']},
    {id: 21, url: 'img/21.jpg', keywords: ['all','kids', 'funny']},
    {id: 22, url: 'img/22.jpg', keywords: ['all','funny', 'bad', 'celeb']},
    {id: 23, url: 'img/23.jpg', keywords: ['all','bad', 'celeb', 'funny']},
    {id: 24, url: 'img/24.jpg', keywords: ['all','funny', 'kids']},
    {id: 25, url: 'img/25.jpg', keywords: ['all','funny', 'happy', 'celeb']},
    {id: 26, url: 'img/26.jpg', keywords: ['all','funny', 'bad', 'celeb']},
];

const gKeywordSearchCount = [
    {keyword: 'funny', size: 20},
    {keyword: 'animals', size: 24},
    {keyword: 'kids', size: 26},
    {keyword: 'happy', size: 22},
    {keyword: 'sad', size: 24},
    {keyword: 'politic', size: 26},
    {keyword: 'bad', size: 22},
    {keyword: 'celeb', size: 24},   
]

let gFilterBy 

function getImages() { 
    if (gFilterBy !== undefined) {
        let images = gImgs.filter(image => 
            image.keywords.join('').toLowerCase().includes(gFilterBy)
        )
        return images
    }
    return gImgs
}

function setFilter(txt) {
    gFilterBy = txt.toLowerCase().trim()
}

function getKeywords() {
    return gKeywordSearchCount
}

function selectKeyword(keywordClicked) {
    const keywordIdx = gKeywordSearchCount.findIndex(({keyword}) => keyword === keywordClicked)
    gKeywordSearchCount[keywordIdx].size <= 28 ?
    gKeywordSearchCount[keywordIdx].size += 2 :
    gKeywordSearchCount[keywordIdx].size = 28 
}