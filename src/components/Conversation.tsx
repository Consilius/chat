import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {Avatar} from ".";

type Props = {
    id: string,
    initials: string,
    name: string,
    surname: string,
    firstLine: string,
    active: boolean,
    unread: boolean,
    time: string,
}

export const Conversation = (props: Props) => <div className={`card is-shadowless has-background-${props.active ? 'grey-lighter' : 'white'}`} style={{borderRadius: "0"}}>
    <div className="card-content py-2">
        <div className="media is-align-items-center">
            <div className="media-left has-text-white">
                <div style={{borderRadius: "3px", border: `3px ${props.unread ? '#485fc7' : 'transparent'} solid`}} />
            </div>
            <Avatar initials={props.initials} />
            <div className="media-content">
                <NameTime><span>{`${props.name} ${props.surname}`}</span><em>{props.time} <FontAwesomeIcon icon={faAngleRight} /></em></NameTime>
                <p className="is-7" style={{color: "#999"}}>{props.firstLine}</p>
            </div>
        </div>
    </div>
</div>

const NameTime = styled.p`
    display: flex;
    justify-content: space-between;
    color: #363636;

    span {
        font-size: 1rem;
        margin: 0;
        padding: 0;
        font-weight: 600;
        line-height: 1.25rem;
    }

    em {
        color: #999 ;
        font-style: normal;
    }
`
