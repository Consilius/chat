import React from 'react';
import {Conversation} from '.';
import {ConversationType} from '../types';

type Props = {
    conversations: Array<ConversationType>,
    loggedUserId: string,
    activeConversationId: string,
}

export const Conversations = (props: Props) => {
    const filteredConversations = props.conversations.filter(row => row.users.find(usr => usr === props.loggedUserId));

    if (!filteredConversations.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredConversations.map(row => <Conversation
        key={row.id}
        initials='DC'
        name='Dale'
        surname='Cooper'
        firstLine='Vzkaz v lahvi'
        active={props.activeConversationId === row.id}
        unread={true}
        time="2:56 PM"
    />)}</>
}

