import {nanoid} from "nanoid";
import {DateTime} from "luxon"; '@types/luxon';
import {ConversationType, MessageType, PersonType} from './types';

export const getInitials = (fullName: string): string => {
    const cleanName = fullName?.trim();

    if (!cleanName) {
        return "";
    }
    const nameParts = cleanName.split(' ');
    return `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ''}`.toUpperCase();
}

export const sortDates = (dateA: DateTime, dateB: DateTime) => {
    if (dateA < dateB) {
        return 1;
    } else if ((dateA < dateB)) {
        return -1;
    }

    return 0;
}

export const getActiveConversation = (conversations: Array<ConversationType>, loggedUserId: string, activePersonId: string, createNew: boolean = true): ConversationType => {
    const activeConversation = conversations.filter(row => row.users.find(id => id === loggedUserId)).filter(row => row.users.find(id => id === activePersonId))

    if (activeConversation.length) {
        return activeConversation[0]
    }

    const newConversation:ConversationType = {
        id: nanoid(),
        users: [loggedUserId, activePersonId],
        messages: [],
        lastMessage: '',
        lastMessageDate: DateTime.now(),
    }

    if (createNew) {
        conversations.push(newConversation);
    }

    return newConversation
}

export const getLastMessage = (messages: Array<MessageType>): string => messages.length ? messages[messages.length - 1].text : '';

export const emptyPerson: PersonType = {
    id: '',
    displayName: '',
    fullName: '',
    initials: '',
    hasFavorites: [''],
}

export const markAsRead = (messages: Array<MessageType>, activePersonId: string, now: string) => {
    for (const message of messages.filter(row => row.from === activePersonId).filter(row => !row.displayed)) {
        message.displayed = now
    }
}
