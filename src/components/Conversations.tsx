import React from 'react';
import {Conversation} from '.';
import {ConversationType, PersonType, WhichConversationType} from '../types';
import {getInitials, sortDates} from '../utils';
import {DateTime} from 'luxon';

type Props = {
    people: Array<PersonType>,
    conversations: Array<ConversationType>,
    loggedUserId: string,
    activeConversationId: string,
    whichConversation: WhichConversationType,
    dispatch: Function,
}

export const Conversations = (props: Props) => {
    const now = DateTime.now();

    const conversations = props.conversations
        .filter(row => row.users.find(usr => usr === props.loggedUserId))
        .map(row => {
            const lastMessage = row.messages.length ? row.messages[row.messages.length - 1].text : '';
            const lastMessageDate = row.messages.length ? DateTime.fromISO(row.messages[row.messages.length - 1].sent) : (row.lastMessageDate ? row.lastMessageDate : now);

            return {
                ...row,
                lastMessage,
                lastMessageDate
            }
        }).sort((rowA, rowB) => sortDates(rowA.lastMessageDate, rowB.lastMessageDate));

    const filteredConversations = props.whichConversation === 'Latest' ? conversations.filter(row => row.lastMessageDate.plus({days: 1}) >= now) : conversations;

    if (!filteredConversations.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredConversations.map(conversation => {
        const toPersonId = conversation.users.find(id => id !== props.loggedUserId);
        const toPerson = props.people.find(person => person.id === toPersonId);
        const isUnread = conversation.messages.find(row => (row.from === toPersonId) && !row.displayed)

        return <Conversation
            key={conversation.id}
            initials={getInitials(toPerson ? toPerson.name : '', toPerson ? toPerson.surname : '')}
            name={toPerson ? toPerson.name : ''}
            surname={toPerson ? toPerson.surname : ''}
            lastLine={conversation.lastMessage}
            active={props.activeConversationId === conversation.id}
            unread={!!isUnread}
            time={conversation.lastMessageDate.toFormat('h:mm a')}
            onClick={e => {e.preventDefault(); props.dispatch({type: 'setActiveConversation', value: {
                activeConversationId: conversation.id,
                activePersonId: toPersonId
            }})}}
    />})}</>
}

