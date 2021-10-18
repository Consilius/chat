import React from 'react';
import styled from 'styled-components';
import {WhichConversationType} from '../types';

type Props = {
    whichConversation: WhichConversationType
    dispatch: Function,
}

export const LatestSwitch = (props: Props) => <LatestToggleEl>
    <span
        className={`${props.whichConversation === 'Latest' ? 'active' : ''}`}
        onClick={e => {e.preventDefault(); props.dispatch({type: 'set', attr: 'Conversation', value: 'Latest'})}}>Latest</span>
    <span className={`${props.whichConversation === 'All' ? 'active' : ''}`} onClick={e => {e.preventDefault(); props.dispatch({type: 'set', attr: 'Conversation', value: 'All'})}}>All</span>
</LatestToggleEl>

const LatestToggleEl = styled.div`
    margin-bottom: -6px;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #b5b5b5;
    border-radius: 8px;
    background-color: #b5b5b5;
    color: #000;

    span {
        display: flex;
        margin: 0;
        width: 70px;
        border: 1px solid #b5b5b5;
        border-radius: 8px;
        align-items: center;
        font-size: 0.75rem;
        justify-content: center;
        height: 2em;
        line-height: 1.5;
        cursor: pointer;
    }

    span.active {
        background-color: whitesmoke;
    }
`
