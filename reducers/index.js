import {GET_DECK, GET_DECKS} from '../utils/constants'

const initialState = {
    decks: [],
    deck: {
        title: '',
        questions: []
    }
};

export function decks(state = initialState, action) {
    switch (action.type) {
        case GET_DECK:
            return {
                ...state,
                deck: action.deck
            };
        case GET_DECKS:
            if (action.decks !== null && action.decks !== undefined) {
                return {
                    ...state,
                    decks: Object.keys(action.decks).map(function (p) {
                        return action.decks[p]
                    })
                };
            }
            return state;
        default:
            return state
    }
}