import React from "react";
import styled from 'styled-components'
import {PersonType} from '../types';

type Props = {
    people: Array<PersonType>,
    loggedUser: PersonType;
    showModal: boolean;
    showFavorites: boolean;
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
    <Body>
        <BorderDiv>
            <em>Name</em> <span>{props.loggedUser.displayName} <em>({props.loggedUser.fullName})</em></span>
            <button className="button" onClick={e => {e.preventDefault(); props.dispatch({type: 'toggle', attr: 'Modal'})}}>Edit</button>
        </BorderDiv>
        <h2 className="title is-4 mt-2">Apperance</h2>
        <BorderDiv>
            <label className="checkbox">
                <label><input
                    type="checkbox"
                    value="1"
                    checked={props.showFavorites}
                    onChange={e => {props.dispatch({type: 'toggle', attr: 'Favorites'})}}
                /> Show favorites in sidebar</label>
            </label>
        </BorderDiv>
        <h2 className="title is-4 mt-2">Debug</h2>
        <SelectDiv style={{}}><em>Active user</em>
            <div className="select">
                <select value={props.loggedUser.id} onChange={e => {e.preventDefault(); props.dispatch({type: 'setLoggedUserId', value: e.target.value})}}>
                    {props.people.map(row => <option value={row.id} key={row.id}>
                        {row.fullName}
                    </option>)}
                </select>
            </div>
        </SelectDiv>
    </Body>

</section>
</div>

const Body = styled.div`
    background-color: #fff;
    align-items: flex-start;
    flex-direction: column;
    padding: 3rem 3rem;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;

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

const SelectDiv = styled.div`
    display: flex;
    align-items: center;

    div {
        margin-left: 2rem;
    }
`;

const BorderDiv = styled.div`
    width: 60%;
    border-bottom: 1px silver solid;
    padding-top: 1rem;
    padding-bottom: 3rem;
`;
