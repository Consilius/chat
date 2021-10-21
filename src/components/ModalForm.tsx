import React, {useState} from 'react';
import {Portal} from '.';
import {PersonType} from '../types';

type Props = {
    loggedUser: PersonType,
    save: Function,
    close: React.MouseEventHandler,
}

export const ModalForm = (props: Props) => {
    const [displayName, setDisplayName] = useState(props.loggedUser.displayName);
    const [fullName, setFullName] = useState(props.loggedUser.fullName);

    return <Portal>
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit name</p>
                    <button className="delete" aria-label="close" onClick={props.close} />
                </header>
                <form className="modal-card-body">
                    <div className="field">
                        <label className="label" htmlFor="displayName">Display name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="fullName">Full name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                    </div>
                </form>
                <footer className="modal-card-foot">
                    <button type="submit" onClick={e => props.save(props.loggedUser.id, displayName, fullName)(e)} className="button is-info">Save</button>
                    <button className="button" onClick={props.close}>Zrušit</button>
                </footer>
            </div>
        </div>
    </Portal>
}
