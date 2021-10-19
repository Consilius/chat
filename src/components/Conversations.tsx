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

    return <>{filteredConversations.map(conversation => {
        const toPersonId = conversation.users.find(id => id !== props.loggedUserId);
        const toPerson = props.people.find(person => person.id === toPersonId);
        const lastMessage = conversation.messages.length ? conversation.messages[conversation.messages.length - 1] : null;
        const isUnread = conversation.messages.find(row => (row.from === toPersonId) && !row.displayed)

        return <Conversation
            key={conversation.id}
            initials={getInitials(toPerson ? toPerson.name : '', toPerson ? toPerson.surname : '')}
            name={toPerson ? toPerson.name : ''}
            surname={toPerson ? toPerson.surname : ''}
            lastLine={lastMessage ? lastMessage.text : ''}
            active={props.activeConversationId === conversation.id}
            unread={!!isUnread}
            time={lastMessage ? DateTime.fromISO(lastMessage.sent).toFormat('h:mm a') : ''}
            onClick={e => {e.preventDefault(); props.dispatch({type: 'setActiveConversation', value: {
                activeConversationId: conversation.id,
                activePersonId: toPersonId
            }})}}
    />})}</>
}

