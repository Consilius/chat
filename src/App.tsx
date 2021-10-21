import React, {useReducer, useEffect, useState} from 'react';
import message from './message.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown, faArrowAltCircleUp, faStar} from '@fortawesome/free-solid-svg-icons'
import {Preferences, Messages, Avatar, LatestSwitch, Favorites, People, Conversations, ModalForm} from './components';
import {initialState, reducer} from './reducer';
import {getInitials, emptyPerson} from './utils';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');
    const [loggedUser, setLoggedUser] = useState({...emptyPerson})
    const [activePerson, setActivePerson] = useState({...emptyPerson})

    useEffect(() => {
        const tmpLU = state.people.find(row => row.id === state.loggedUserId)

        if (tmpLU) {
            setLoggedUser({
                ...tmpLU,
                initials: getInitials(tmpLU.fullName),
                hasFavorites: tmpLU.hasFavorites,
            })
        }

    }, [state.loggedUserId])

    useEffect(() => {
        const tmpAP = state.people.find(row => row.id === state.activePersonId)

        if (tmpAP) {
            setActivePerson({
                ...tmpAP,
                initials: getInitials(tmpAP.fullName),
            })
        } else {
            setActivePerson({...emptyPerson})
        }
    }, [state.activePersonId])

    return <section className="hero">
        <div className="hero-body p-0">
            <div className="columns is-gapless">
                <div className="column is-one-quarter has-background-light">
                    <div className="card is-shadowless has-background-light mb-5" onClick={e =>{e.preventDefault(); dispatch({type: 'displayPreferences'})}} style={{cursor: 'pointer'}}>
                        <div className="card-content py-2">
                            <div className="media is-align-items-center">
                                <div className="media-content has-text-right">
                                    <p className="title is-6 mb-0 mr-2">{loggedUser.fullName}</p>
                                </div>
                                <Avatar initials={loggedUser.initials} size={24} />
                            </div>
                        </div>
                    </div>
                    <div className={`card is-shadowless `} style={{cursor: 'pointer', borderRadius: "0", backgroundColor: `${state.displayConversations ? '#a4a4a4' : 'transparent'}`}} onClick={e => {e.preventDefault(); dispatch({type: 'displayConversations'})}}>
                        <div className="card-content">
                            <div className="media is-align-items-center">
                                <div className="media-left">
                                    <figure className="image is-48x48 p-2" style={{borderRadius: "48px", backgroundColor: "#06aeee"}}>
                                        <img src={message} alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">Conversations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {state.showFavorites && <><div className="content mt-5 mb-0">
                        <h2 className="title is-4 py-0 my-0 px-4 is-flex is-justify-content-space-between"><span>Favorites</span>
                        <FontAwesomeIcon style={{cursor: 'pointer'}} icon={state.showFavorite ? faAngleDown : faAngleRight} onClick={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'Favorite'})}} /></h2>
                    </div>
                    {state.showFavorite && <Favorites
                        conversations={state.conversations}
                        people={state.people}
                        loggedUser={loggedUser}
                        dispatch={dispatch}
                    />}</>}
                    <div className="content mt-2 mb-0">
                        <h2 className="title is-4 py-0 my-0 px-4 is-flex is-justify-content-space-between"><span>People</span>
                        <FontAwesomeIcon style={{cursor: 'pointer'}} icon={state.showPeople ? faAngleDown : faAngleRight} onClick={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'People'})}} />
                        </h2>
                    </div>
                    {state.showPeople && <People
                        people={state.people}
                        loggedUserId={state.loggedUserId}
                        dispatch={dispatch}
                    />}
                </div>
                {state.displayConversations && <div className="column has-background-white is-one-third" style={{borderRight: "1px solid black"}}>
                    <article className="message">
                        <div className="message-header is-justify-content-center has-background-white" style={{borderBottom: "1px solid black"}}>
                            <LatestSwitch
                                whichConversation={state.whichConversation}
                                dispatch={dispatch}
                            />
                        </div>
                        <div className="message-body has-background-white p-0">
                            <Conversations
                                people={state.people}
                                conversations={state.conversations}
                                loggedUserId={state.loggedUserId}
                                activeConversationId={state.activeConversationId}
                                whichConversation={state.whichConversation}
                                dispatch={dispatch}
                            />
                        </div>
                    </article>
                </div>}
                {state.displayPreferences ? <Preferences
                    people={state.people}
                    loggedUser={loggedUser}
                    showModal={state.showModal}
                    showFavorites={state.showFavorites}
                    dispatch={dispatch}
                /> : <div className="column has-background-white">
                    <section className="hero is-fullheight">
                        <div className="hero-head">
                            <article className="message">
                                <div className="message-header is-justify-content-end has-background-white has-text-black" style={{borderBottom: "1px solid black"}}>
                                    <p style={{width: "100%", textAlign: "center"}}>Conversation with {activePerson.displayName}</p>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        style={{color: `${loggedUser.hasFavorites.find(id => id === activePerson.id) ? 'black' :'silver'}`, cursor: 'pointer'}}
                                        onClick={e => {e.preventDefault(); dispatch({type: 'toggleFavorite'})}}
                                    />
                                </div>
                            </article>
                        </div>
                        <div className="hero-foot">
                            <article className="message">
                                <div className="message-body has-background-white" style={{border: "none"}}>
                                    <Messages
                                        conversations={state.conversations}
                                        activePerson={activePerson}
                                        loggedUser={loggedUser}
                                        activeConversationId={state.activeConversationId}
                                        loggedUserId={state.loggedUserId}
                                    />
                                    <div className="field mt-4">
                                        <form className="control has-icons-left has-icons-right" onSubmit={e => {e.preventDefault(); dispatch({type: 'addMessage', value: text}); setText("") }}>
                                            <input
                                                className="input"
                                                type="text"
                                                value={text}
                                                placeholder={`Message ${activePerson.displayName}`}
                                                style={{borderRadius: "25px"}}
                                                onChange={e => {setText(e.target.value)}}
                                            />
                                            <span className="icon is-small is-right" style={{pointerEvents: "auto"}} >
                                                <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={e => {e.preventDefault(); dispatch({type: 'addMessage', value: text}); setText("") }} />
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>}
            </div>
        </div>
        {state.showModal && <ModalForm
            loggedUser={loggedUser}
            close={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'Modal'})}}
            save={(id: string, displayName: string, fullName: string) => (e: Event) => {e.preventDefault(); dispatch({type: 'saveNames', value: {
                id,
                displayName,
                fullName
            }}); setLoggedUser(o => {return {...o, displayName, fullName, initials: getInitials(fullName)}}); dispatch({type: 'toggle', attr: 'Modal'})}}
        />}
    </section>
}
