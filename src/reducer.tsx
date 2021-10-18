export const initialState = {
    showPeople: false,
    showFavorite: true,
    showConversations: true,
    whichConversation: 'Latest',
    activeUser: '1',
    activeConversation: '1',
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
                sent: '17.10.2021 13:55',
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
            isFavorite: ['2', '5'],
        },
        {
            id: '2',
            name: 'Harry',
            surname: 'Trueman',
            isFavorite: ['1'],
        },
        {
            id: '3',
            name: 'Pete',
            surname: 'Packard',
            isFavorite: ['1'],
        },
        {
            id: '4',
            name: 'Josie',
            surname: 'Packard',
            isFavorite: [],
        },
        {
            id: '5',
            name: 'Týna',
            surname: 'Žánů',
            isFavorite: [],
        },
    ]
}

const allowedAttrs = ['showPeople', 'showConversations', 'showFavorite', 'showLatest'];

export const reducer = (state, action) => {
    switch (action.type) {
        case 'toggle': {
            const tmpAttr = `show${action.attr}`
            if (!allowedAttrs.find(row => row === tmpAttr)) {
                throw new Error('Unsupported show attribute');
            }
            return {
                ...state,
                [tmpAttr]: !state[tmpAttr],
            }
        }
        case 'set': {
            const tmpAttr = `which${action.attr}`
            return {
                ...state,
                [tmpAttr]: action.value,
            }
        }
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error('Undefined dispatch type');
    }
}
