import React, {useReducer, useEffect, useState} from 'react';
import message from './message.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown, faArrowAltCircleUp, faStar} from '@fortawesome/free-solid-svg-icons'
import {Message, Avatar, LatestSwitch, Favorites, People, Conversations} from './components';
import {initialState, reducer} from './reducer';
import {getInitials} from './utils';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loggedUser, setLoggedUser] = useState({
        dispName: '',
        initials: '',
        hasFavorites: [''],
    })
    const [activePerson, setActivePerson] = useState({
        id: '',
        name: '',
        dispName: '',
        initials: '',
        hasFavorites: [''],
    })

    useEffect(() => {
        const tmpLU = state.people.find(row => row.id === state.loggedUserId)

        if (tmpLU) {
            setLoggedUser({
                dispName: `${tmpLU.name} ${tmpLU .surname}`,
                initials: getInitials(tmpLU.name, tmpLU.surname),
                hasFavorites: tmpLU.hasFavorites,
            })
        }

    }, [state.loggedUserId])

    useEffect(() => {
        const tmpAP = state.people.find(row => row.id === state.activePersonId)

        if (tmpAP) {
            setActivePerson({
                ...tmpAP,
                dispName: `${tmpAP.name} ${tmpAP.surname}`,
                initials: getInitials(tmpAP.name, tmpAP.surname),
            })
        } else {
            new Error('Active person not foun')
        }
    }, [state.activePersonId])

    return <section className="hero">
        <div className="hero-body p-0">
            <div className="columns is-gapless">
                <div className="column is-one-quarter has-background-light">
                    <div className="card is-shadowless has-background-light mb-5">
                        <div className="card-content py-2">
                            <div className="media is-align-items-center">
                                <div className="media-content has-text-right">
                                    <p className="title is-6 mb-0 mr-2">{loggedUser.dispName}</p>
                                </div>
                                <Avatar initials={loggedUser.initials} size={24} />
                            </div>
                        </div>
                    </div>
                    <div className={`card is-shadowless `} style={{cursor: 'pointer', borderRadius: "0", backgroundColor: `${state.showConversations ? '#a4a4a4' : 'transparent'}`}} onClick={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'Conversations'})}}>
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
                    <div className="content mt-5 mb-0">
                        <h2 className="title is-4 py-0 my-0 px-4 is-flex is-justify-content-space-between"><span>Favorites</span>
                        <FontAwesomeIcon style={{cursor: 'pointer'}} icon={state.showFavorite ? faAngleDown : faAngleRight} onClick={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'Favorite'})}} /></h2>
                    </div>
                    {state.showFavorite && <Favorites
                        people={state.people}
                        loggedUser={loggedUser}
                        dispatch={dispatch}
                    />}
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
                {state.showConversations && <div className="column has-background-white is-one-third" style={{borderRight: "1px solid black"}}>
                    <article className="message">
                        <div className="message-header is-justify-content-center has-background-white" style={{borderBottom: "1px solid black"}}>
                            <LatestSwitch
                                dispatch={dispatch}
                                whichConversation={state.whichConversation}
                            />
                        </div>
                        <div className="message-body has-background-white p-0">
                            <Conversations
                                conversations={state.conversations}
                                loggedUserId={state.loggedUserId}
                                activeConversationId={state.activeConversationId}
                            />
                        </div>
                    </article>
                </div>}
                <div className="column has-background-white">
                    <section className="hero is-fullheight">
                        <div className="hero-head">
                            <article className="message">
                                <div className="message-header is-justify-content-end has-background-white has-text-black" style={{borderBottom: "1px solid black"}}>
                                    <p style={{width: "100%", textAlign: "center"}}>Conversation with {activePerson.name}</p>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        style={{color: `${loggedUser.hasFavorites.find(id => id === activePerson.id) ? 'black' :'silver'}`}}
                                        onClick={e => {e.preventDefault(); dispatch({type: 'toggleFavorite'})}}
                                    />
                                </div>
                            </article>
                        </div>
                        <div className="hero-foot">
                            <article className="message">
                                <div className="message-body has-background-white" style={{border: "none"}}>
                                    {state.conversations.find(row => row.id === state.activeConversationId).messages.map((mess, ind, array) => {
                                        const isSameUser = ind ? (array[ind-1].from === mess.from) : false;
                                        return <Message
                                            key={mess.id}
                                            me={state.loggedUserId === mess.from}
                                            initials={isSameUser ? '' : (state.loggedUserId === mess.from ? loggedUser.initials : "XZ")}>
                                                {mess.text.split("\n").map((row, i) => <p key={i}>{row}</p>)}
                                        </Message>
                                    })}
                                    <div className="field mt-4">
                                        <p className="control has-icons-left has-icons-right">
                                            <input className="input" type="email" placeholder="Message Peter" style={{borderRadius: "25px"}} />
                                            <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                            </span>
                                            <span className="icon is-small is-right">
                                                <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
}
