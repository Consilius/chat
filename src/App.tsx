import React, {useReducer, useEffect, useState} from 'react';
import message from './message.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown, faArrowAltCircleUp, faStar} from '@fortawesome/free-solid-svg-icons'
import {Favorite, Person, Conversation, Message, Avatar, LatestSwitch} from './components';
import {initialState, reducer} from './reducer';
import {getInitials} from './utils';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [activeUser, setActiveUser] = useState({
        dispName: '',
        initials: '',
        isFavorite: [],
    })

    useEffect(() => {
        const activeU= state.people.find(row => row.id === state.activeUser)

        setActiveUser({
            dispName: `${activeU.name} ${activeU.surname}`,
            initials: getInitials(activeU.name, activeU.surname),
            isFavorite: activeU.isFavorite,
        })
    }, [state.activeUser])

    return <section className="hero">
        <div className="hero-body p-0">
            <div className="columns is-gapless">
                <div className="column is-one-quarter has-background-light">
                    <div className="card is-shadowless has-background-light mb-5">
                        <div className="card-content py-2">
                            <div className="media is-align-items-center">
                                <div className="media-content has-text-right">
                                    <p className="title is-6 mb-0 mr-2">{activeUser.dispName}</p>
                                </div>
                                <Avatar initials={activeUser.initials} size={24} />
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
                    {state.showFavorite && state.people.filter(row => activeUser.isFavorite.find(fId => fId === row.id)).map(row => <Favorite
                        key={row.id}
                        initials={getInitials(row.name, row.surname)}
                        name={row.name}
                        surname={row.surname}
                        firstLine='aaaa'
                    />)}
                    <div className="content mt-2 mb-0">
                        <h2 className="title is-4 py-0 my-0 px-4 is-flex is-justify-content-space-between"><span>People</span>
                        <FontAwesomeIcon style={{cursor: 'pointer'}} icon={state.showPeople ? faAngleDown : faAngleRight} onClick={e => {e.preventDefault(); dispatch({type: 'toggle', attr: 'People'})}} />
                        </h2>
                    </div>
                    {state.showPeople && state.people.filter(row => row.id !== state.activeUser).map(row => <Person
                        key={row.id}
                        initials={getInitials(row.name, row.surname)}
                        name={row.name}
                        surname={row.surname}
                    />)}
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
                            {state.conversations.filter(row => row.users.find(usr => usr === state.activeUser)).map(row => <Conversation
                                key={row.id}
                                initials='DC'
                                name='Dale'
                                surname='Cooper'
                                firstLine='Vzkaz v lahvi'
                                active={state.activeConversation === row.id}
                                unread={true}
                                time="2:56 PM"
                            />)}
                        </div>
                    </article>
                </div>}
                <div className="column has-background-white">
                    <section className="hero is-fullheight">
                        <div className="hero-head">
                            <article className="message">
                                <div className="message-header is-justify-content-end has-background-white has-text-black" style={{borderBottom: "1px solid black"}}>
                                    <p style={{width: "100%", textAlign: "center"}}>Conversation with Peter</p>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            </article>
                        </div>
                        <div className="hero-foot">
                            <article className="message">
                                <div className="message-body has-background-white" style={{border: "none"}}>
                                    {state.conversations.find(row => row.id === state.activeConversation).messages.map((mess, ind, array) => {
                                        const isSameUser = ind ? (array[ind-1].from === mess.from) : false;
                                        console.log(isSameUser)
                                        return <Message
                                            key={mess.id}
                                            me={state.activeUser === mess.from}
                                            initials={isSameUser ? '' : (state.activeUser === mess.from ? activeUser.initials : "XZ")}>
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
