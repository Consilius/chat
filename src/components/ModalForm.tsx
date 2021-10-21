import React from 'react';
import {Portal} from '.';
import {PersonType} from '../types';

type Props = {
    loggedUser: PersonType,
    save: React.MouseEventHandler,
    close: React.MouseEventHandler,
}

export const ModalForm = (props: Props) => <Portal><div className="modal is-active">
    <div className="modal-background" />
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Edit name</p>
                <button className="delete" aria-label="close" onClick={props.close} />
            </header>
            <form className="modal-card-body">
                Chcete smazat zvolenou položku?
            </form>
            <footer className="modal-card-foot">
                <button type="submit" onClick={async (e) => await props.save(props.item.id)(e)} className="button is-info">Save</button>
                <button className="button" onClick={props.close}>Zrušit</button>
            </footer>
        </div>
    </div>
</Portal>
