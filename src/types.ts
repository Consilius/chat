import {DateTime} from "luxon"; '@types/luxon';

export type MessageType = {
    id: string,
    from: string,
    sent: string,
    displayed: string|null,
    text: string,
}
export type PersonType = {
    id: string,
    displayName: string,
    fullName: string,
    hasFavorites: Array<string>,
    initials?: string,
}

export type ConversationType = {
    id: string,
    users: Array<string>,
    messages: Array<MessageType>,
    lastMessage?: string,
    lastMessageDate?: DateTime,
}

export type WhichConversationType = 'Latest'|'All';

export type StateType = {
    showPeople: boolean,
    showFavorite: boolean,
    showFavorites: boolean,
    showModal: boolean,
    displayConversations: boolean,
    displayPreferences: boolean,
    whichConversation: WhichConversationType,
    loggedUserId: string,
    activePersonId: string,
    activeConversationId: string,
    conversations: Array<ConversationType>,
    people: Array<PersonType>,
}

export type ActionType = {
    type: string,
    attr?: string,
    value?: any,
}
