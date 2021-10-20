import React from 'react';
import {PersonType, ConversationType} from '../types';
import {getInitials, getActiveConversation, getLastMessage} from '../utils';
import {Favorite} from '.';

type Props = {
    conversations: Array<ConversationType>,
    people: Array<PersonType>,
    loggedUser: PersonType,
    dispatch: Function,
}

export const Favorites = (props: Props) => {
    const filteredPeople = props.people.filter(row => props.loggedUser.hasFavorites.find(fId => fId === row.id));

    if (!filteredPeople.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredPeople.map(row => {
        const conversation = getActiveConversation(props.conversations, props.loggedUser.id, row.id, false)

        return <Favorite
            key={row.id}
            initials={getInitials(row.name, row.surname)}
            name={row.name}
            surname={row.surname}
            lastLine={getLastMessage(conversation.messages)}
            onClick={e => {e.preventDefault(); props.dispatch({type: 'setActivePerson', value: row.id})}}
        />
    })}</>
}
