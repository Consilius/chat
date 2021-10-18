import React from "react";
import Styled from 'styled-components'
import {Avatar} from ".";

type Props = {
    me?: boolean,
    initials?: string,
    children: React.ReactNode,
}

export const Message = (props: Props) => <MesssageEl {...props}>
    <Avatar initials={props.initials} />
    <div>
        {props.children}
    </div>
</MesssageEl>

const MesssageEl = Styled.div<{me?: boolean, initials?: string}>`
    display: flex;
    align-items: flex-start;
    margin-top: ${props => props.initials ? 1 : 0.2}rem;

    div {
        background-color: ${props => props.me ? '#06aeee' : '#dcdcdc'} ;
        color: ${({me}) => me ? '#fff' : '#000'};
        padding: 5px 10px;
        border-radius: 15px;
        width: fit-content;
        margin-left: 0.5rem;
    }
`;
