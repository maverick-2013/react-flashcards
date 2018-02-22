import {AsyncStorage} from 'react-native'

import {DECK_STORAGE_KEY} from './helpers'
import {GET_DECK, GET_DECKS} from '../utils/constants'

export function addDeck(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: {title: title, questions: []}}))
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function getDeck(deck) {
    return {
        type: GET_DECK,
        deck
    }
}

export function addCardToDeck(title, question) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            if (data[title] !== undefined) {
                data[title].questions.push(question);
                AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
            }
        })
}

export function getDeckByTitle(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)[title]
        })
}

export function fetchAllDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
}

export function loadDecks(dispatch) {
    fetchAllDecks()
        .then((decks) => {
            dispatch(getDecks(decks))
        })

}

export function loadDeck(title, dispatch) {
    getDeckByTitle(title)
        .then((deck) => {
            dispatch(getDeck(deck))
        })
}





