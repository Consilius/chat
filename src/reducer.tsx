import {nanoid} from "nanoid";
import {StateType, ActionType} from './types';
import {DateTime} from 'luxon';
import {getActiveConversation, markAsRead} from './utils';

export const initialState: StateType = {
    showPeople: true,
    showFavorite: true,
    showFavorites: true,
    showModal: false,
    displayConversations: false,
    displayPreferences: true,
    whichConversation: 'Latest',
    loggedUserId: '1',
    activePersonId: '',
    activeConversationId: '',
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
            displayName: 'Dale',
            fullName: 'Dale Cooper',
            hasFavorites: ['2', '5'],
        },
        {
            id: '2',
            displayName: 'Harry',
            fullName: 'Harry Trueman',
            hasFavorites: ['1'],
        },
        {
            id: '3',
            displayName: 'Pete',
            fullName: 'Pete Packard',
            hasFavorites: ['1'],
        },
        {
            id: '4',
            displayName: 'Josie',
            fullName: 'Josie Packard',
            hasFavorites: [],
        },
        {
            id: '5',
            displayName: 'Týna',
            fullName: 'Týna Žánů',
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
            const conversation = getActiveConversation(state.conversations, state.loggedUserId, action.value);
            const now = DateTime.now().toISO();

            markAsRead(conversation.messages, action.value, now)

            return {
                ...state,
                displayPreferences: false,
                displayConversations: false,
                activePersonId: action.value,
                activeConversationId: conversation.id,
            };
        }

        case 'setActiveConversation': {

            const conversation = state.conversations.find(row => row.id === action.value.activeConversationId)

            if (conversation) {
                const now = DateTime.now().toISO();

                markAsRead(conversation.messages, action.value.activeConversationId, now)
            }

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

        case 'displayPreferences':
            return {
                ...state,
                displayPreferences: true,
                displayConversations: false,
            }

        case 'displayConversations':
            return {
                ...state,
                displayPreferences: false,
                displayConversations: true,
            }

        case 'saveNames': {
            const loggedUser = state.people.find(row => row.id === state.loggedUserId);

            if (!loggedUser) {
                throw Error("No user is logged in")
            }

            loggedUser.displayName = action.value.displayName;
            loggedUser.fullName = action.value.fullName;

            return {
                ...state,
            }

        }

        case 'setLoggedUserId':
            return {
                ...state,
                loggedUserId: action.value,
                activeConversationId: '',
                activePersonId: '',
            }

        default:
            throw new Error('Undefined dispatch type');
    }
}
