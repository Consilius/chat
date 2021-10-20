import {nanoid} from "nanoid";
import {StateType, ActionType} from './types';
import {DateTime} from 'luxon';
import {getActiveConversation} from './utils';

export const initialState: StateType = {
    showPeople: true,
    showFavorite: true,
    displayConversations: true,
    displaySettings: false,
    whichConversation: 'Latest',
    loggedUserId: '1',
    activePersonId: '2',
    activeConversationId: '1',
    conversations: [{
        id: '1',
        users: ['1', '2'],
        messages: [
            {
                id: '1',
                from: '1',
                sent: '17.10.2021 12:55',
                displayed: '17.10.2021 12:57',
                text: 'Věta první.'
            },
            {
                id: '2',
                from: '1',
                sent: '17.10.2021 12:56',
                displayed: '17.10.2021 12:57',
                text: "Věta druhá. A souvětí s Enterem, \n ach ano, to je ono"
            },
            {
                id: '3',
                from: '2',
                sent: '17.10.2021 13:55',
                displayed: '17.10.2021 12:57',
                text: "Věta třetí. A souvětí s Enterem a Věta třetí. A souvětí s Enterem a Věta třetí. A souvětí s Enterem, \n ach ano, to je ono"
            },
            {
                id: '4',
                from: '1',
                sent: '17.10.2021 13:55',
                displayed: '17.10.2021 12:57',
                text: 'Věta druhá. A souvětí s Enterem, <br/> ach ano, to je ono'
            },
            {
                id: '5',
                from: '1',
                sent: '17.10.2021 13:55',
                displayed: '17.10.2021 12:57',
                text: 'Věta druhá. A souvětí s Enterem, <br/> ach ano, to je ono'
            },
            {
                id: '6',
                from: '2',
                sent: '17.10.2021 13:55',
                displayed: null,
                text: 'Věta druhá. A souvětí s Enterem, <br/> ach ano, to je ono'
            },
            {
                id: '7',
                from: '2',
                sent: '2021-10-19T13:00:17.000Z',
                displayed: null,
                text: 'Věta druhá. A souvětí s Enterem, <br/> ach ano, to je ono'
            },
        ]
    }],
    people: [
        {
            id: '1',
            name: 'Dale',
            surname: 'Cooper',
            hasFavorites: ['2', '5'],
        },
        {
            id: '2',
            name: 'Harry',
            surname: 'Trueman',
            hasFavorites: ['1'],
        },
        {
            id: '3',
            name: 'Pete',
            surname: 'Packard',
            hasFavorites: ['1'],
        },
        {
            id: '4',
            name: 'Josie',
            surname: 'Packard',
            hasFavorites: [],
        },
        {
            id: '5',
            name: 'Týna',
            surname: 'Žánů',
            hasFavorites: [],
        },
    ]
}

export const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'toggle': {
            if (!(typeof action.attr === 'string')) {
                throw new Error('attribute has to be string');
            }

            const tmpAttr = `show${action.attr}`
            return {
                ...state,
                [tmpAttr]: !state[tmpAttr],
            }
        }

        case 'toggleFavorite': {
            const loggedUser = state.people.find(row => row.id === state.loggedUserId);
            if (!loggedUser) {
                throw Error("No user is logged in")
            }
            const favoriteIndex = loggedUser.hasFavorites.findIndex(id => id === state.activePersonId);

            if (favoriteIndex === -1) {
                loggedUser?.hasFavorites.push(state.activePersonId);
            } else {
                loggedUser?.hasFavorites.splice(favoriteIndex, 1);
            }

            return {
                ...state
            }
        }

        case 'set': {
            const tmpAttr = `which${action.attr}`
            return {
                ...state,
                [tmpAttr]: action.value,
            }
        }

        case 'setActivePerson': {
            return {
                ...state,
                displaySettings: false,
                displayConversations: false,
                activePersonId: action.value,
                activeConversationId: getActiveConversation(state.conversations, state.loggedUserId, action.value).id,
            };
        }

        case 'setActiveConversation': {
            return {
                ...state,
                activePersonId: action.value.activePersonId,
                activeConversationId: action.value.activeConversationId,
            };
        }

        case 'addMessage': {
            if (!action.value.trim()) {
                return state;
            }

            const conversation = state.conversations.find(row => row.id === state.activeConversationId);
            conversation?.messages.push({
                id: nanoid(),
                from: state.loggedUserId,
                displayed: null,
                sent: DateTime.now().toISO(),
                text: action.value
            });

            return {
                ...state
            }
        }

        case 'displaySettings':
            return {
                ...state,
                displaySettings: true,
                displayConversations: false,
            }

        case 'displayConversations':
            return {
                ...state,
                displaySettings: false,
                displayConversations: true,
            }

        default:
            throw new Error('Undefined dispatch type');
    }
}
