import React from "react";
import styled from 'styled-components'
import {Message} from '.';
import {ConversationType, PersonType, WhichConversationType} from '../types';

type Props = {
    conversations: Array<ConversationType>,
    activeConversationId: string,
    loggedUser: PersonType,
    activePerson: PersonType,
    loggedUserId: string,
}

export const Messages = (props: Props) => {
    const actualConversation = props.conversations.find(row => row.id === props.activeConversationId);

    if (!actualConversation?.messages.length) {
        return <Empty>Conversation is empty...</Empty>
    }

    return <>{
        actualConversation?.messages.map((mess, ind, array) => {
        const isSameUser = ind ? (array[ind-1].from === mess.from) : false;
        return <Message
            key={mess.id}
            me={props.loggedUserId === mess.from}
            initials={isSameUser ? '' : (props.loggedUserId === mess.from ? props.loggedUser.initials : props.activePerson.initials)}>
                {mess.text.split("\n").map((row, i) => <p key={i}>{row}</p>)}
        </Message>
    })}</>
}

const Empty = styled.div`
    text-align: right;
    font-style: italic;
    color: silver;
    margin-right: 2rem;
`;
