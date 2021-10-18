import React from 'react';
import {Conversation} from '.';
import {ConversationType, PersonType} from '../types';
import {getInitials} from '../utils';
import {DateTime} from 'luxon';

type Props = {
    people: Array<PersonType>,
    conversations: Array<ConversationType>,
    loggedUserId: string,
    activeConversationId: string,
    dispatch: Function,
}

export const Conversations = (props: Props) => {
    const filteredConversations = props.conversations.filter(row => row.users.find(usr => usr === props.loggedUserId));

    if (!filteredConversations.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredConversations.map(row => {
        const toPersonId = row.users.find(id => id !== props.loggedUserId);
        const toPerson = props.people.find(person => person.id === toPersonId);
        const lastMessage = row.messages.length ? row.messages[row.messages.length - 1] : null;

        return <Conversation
            key={row.id}
            initials={getInitials(toPerson ? toPerson.name : '', toPerson ? toPerson.surname : '')}
            name={toPerson ? toPerson.name : ''}
            surname={toPerson ? toPerson.surname : ''}
            lastLine={lastMessage ? lastMessage.text : ''}
            active={props.activeConversationId === row.id}
            unread={lastMessage ? !lastMessage.displayed : false}
            time={lastMessage ? DateTime.fromISO(lastMessage.sent).toFormat('h:mm a') : ''}
            onClick={e => {e.preventDefault(); props.dispatch({type: 'setActiveConversation', value: {
                activeConversationId: row.id,
                activePersonId: toPersonId
            }})}}
    />})}</>
}

