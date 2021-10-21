import React from "react";
import styled from 'styled-components'
import {PersonType} from '../types';

type Props = {
    loggedUser: PersonType;
    showModal: boolean;
    dispatch: Function;
}

export const Preferences = (props: Props) => <div className="column has-background-white">
<section className="hero is-fullheight">
    <div className="hero-head">
        <article className="message">
            <div className="message-header is-justify-content-end has-background-white has-text-black" style={{borderBottom: "1px solid black"}}>
                <p style={{width: "100%"}}>Preferences</p>
            </div>
        </article>
    </div>
    <Body className="hero-body">
        <article className="message">
            <div className="message-body has-background-white" style={{border: "none"}}>
                <div>
                    <em>Name</em> <span>{props.loggedUser.name} <em>({props.loggedUser.dispName})</em></span>
                    <button className="button" onClick={e => {e.preventDefault(); props.dispatch({type: 'toggle', attr: 'Modal'})}}>Edit</button>
                </div>
            </div>
            <div className="message-body has-background-white" style={{border: "none"}}>
                <div><em>Name</em> <span>{props.loggedUser.name} <em>{props.loggedUser.dispName}</em></span></div>
            </div>
            <div className="message-body has-background-white" style={{border: "none"}}>
                <div><em>Name</em> <span>{props.loggedUser.name} <em>{props.loggedUser.dispName}</em></span></div>
            </div>
            <div className="message-body has-background-white" style={{border: "none"}}>
                <div><em>Name</em> <span>{props.loggedUser.name} <em>{props.loggedUser.dispName}</em></span></div>
            </div>
        </article>
    </Body>

</section>
</div>

const Body = styled.div`
    background-color: #fff;
    align-items: flex-start;

    button {
        height: 1.5em;
        margin-left: 3em;
    }

    span {
        margin-left: 2rem;
    }
    em {
        font-style: normal;
        color: silver;
    }
`;
