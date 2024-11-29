import { dictionary } from './vocabularyData.js'

const wordInput = document.getElementById('translate')
const btnTranslate = document.getElementById('translateBtn')
const translateAside = document.getElementById('translateAside')

const getAllWords = () => {
    const categories = Object.values(dictionary.categories)
    return categories.flat()
}

const resultSection = (words) => {
    const existingSection = document.getElementById('wordTranslate')
    if (existingSection) {
        existingSection.remove()
    }

    const translateContainer = document.createElement('section')
    translateContainer.classList.add('wordTranslate')
    translateContainer.id = 'wordTranslate'

    const wordTranslate = document.createElement('h2')
    wordTranslate.textContent = words.word

    const englishExample = document.createElement('h3')
    englishExample.textContent = `Example: ${words.example}`

    const spanishExample = document.createElement('h4')
    spanishExample.textContent = `${words.translateExample || 'No disponible'}`

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('exampleImg')
    imgContainer.id = 'exampleImg'

    const imgExample = document.createElement('img')
    imgExample.src = words.image || 'assets/images/no-image.png'
    imgExample.alt = words.example

    imgContainer.appendChild(imgExample)
    translateContainer.appendChild(wordTranslate)
    translateContainer.appendChild(englishExample)
    translateContainer.appendChild(spanishExample)
    translateContainer.appendChild(imgContainer)

    translateAside.appendChild(translateContainer)
}

btnTranslate.addEventListener('click', (event) => {
    event.preventDefault()

    const language = document.querySelector('input[name="languaje"]:checked')
    if (!language) {
        alert('Please select a language :)')
        return
    }

    const selectedLanguage = language.value
    const word = wordInput.value.trim().toLowerCase()

    const allWords = getAllWords()
    const translation = allWords.find(item =>
        item.english.toLowerCase() === word || item.spanish.toLowerCase() === word
    )

    if (translation) {
        if (selectedLanguage === 'english') {
            resultSection({
                word: translation.english,
                example: translation.example,
                translateExample: translation.example_spanish,
                image: translation.img_example,
            })
        } else {
            resultSection({
                word: translation.spanish,
                example: translation.example_spanish || 'No example available :/',
                translateExample: translation.example,
                image: translation.img_example,
            })
        }
    } else {
        resultSection({
            word: 'Word not found :(',
            example: 'No example available :/',
            translateExample: 'No hay ejemplo para mostrar.',
            image: 'assets/images/no-image.png',
        })
    }
})
