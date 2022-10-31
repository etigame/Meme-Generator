'use strict'

const gTrans = {
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'my-memes': {
        en: 'My Memes',
        he: 'הממים שלי',
    },
    'about': {
        en: 'About',
        he: 'אודות',
    },
    'search-keyword': {
        en: 'Search Keyword',
        he: 'מצא לפי מילת חיפוש'
    },
    'all': {
        en: 'All',
        he: 'הכל',
    },
    'happy': {
        en: 'Happy',
        he: 'שמח',
    },
    'animals': {
        en: 'Animals',
        he: 'חיות',
    },
    'sad': {
        en: 'Sad',
        he: 'עצוב',
    },
    'funny': {
        en: 'Funny',
        he: 'מצחיק',
    },
    'kids': {
        en: 'Kids',
        he: 'ילדים'
    },
    'upload': {
        en: 'Upload',
        he: 'העלאה'
    },
    'politic': {
        en: 'Politic',
        he: 'פוליטי',
    },
    'bad': {
        en: 'Bad',
        he: 'רוע'
    },
    'celeb': {
        en: 'Celeb',
        he: 'סלבס'
    },
    'input-txt': {
        en: 'Write something...',
        he: 'כתוב משהו...'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    },
    'download': {
        en: 'Download',
        he: 'הורדה'
    },
    'my-name': {
        en: 'Eti Gal-Or Mendelovich',
        he: 'אתי גל-אור מנדלוביץ'
    },
    'about-me': {
        en: 'I am a full-motivated developer, curious and hard working person.<br> Always in growth and learning process. Very responsible and reliable.<br> Love to work in teams and excited of new challenges.',
        he: 'אני מפתחת פול-סטאק, מלאת מוטיבציה, סקרנית ויודעת לעבוד קשה. אוהבת להיות תמיד בתהליך של צמיחה ולמידה. אחראית מאוד ואמינה. אוהבת לעבוד בצוותים ומתרגשת מאתגרים חדשים.'
    },
    'all-rights': {
        en: 'All Rights Reserved 2022 ©',
        he: '© כל הזכויות שמורות'
    },
}

let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function toggleLang() {
    gCurrLang === 'en'? gCurrLang = 'he' : gCurrLang = 'en'
}

function getCurrLang() {
    return gCurrLang
}