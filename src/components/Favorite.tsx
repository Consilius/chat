import React from 'react';
import {Avatar} from ".";

type Props = {
    initials: string,
    name: string,
    surname: string,
    lastLine: string,
    onClick: React.MouseEventHandler,
}

export const Favorite = (props: Props) => <div className="card is-shadowless has-background-light" onClick={props.onClick} style={{cursor: 'pointer'}}>
    <div className="card-content py-2">
        <div className="media is-align-items-center">
            <Avatar initials={props.initials} />
            <div className="media-content">
                <p className="title is-6 mb-0">{`${props.name} ${props.surname}`}</p>
                <p className="is-7">{props.lastLine}</p>
            </div>
        </div>
    </div>
</div>
