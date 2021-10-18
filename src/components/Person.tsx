import React from 'react';
import {Avatar} from ".";

type Props = {
    initials: string,
    name: string,
    surname: string,
    onClick: React.MouseEventHandler,
}

export const Person = (props: Props) => <div className="card is-shadowless has-background-light" onClick={props.onClick}>
    <div className="card-content py-2">
        <div className="media is-align-items-center">
            <Avatar
                initials={props.initials}
                size={24}
            />
            <div className="media-content">
                <p className="title is-6 mb-0">{`${props.name} ${props.surname}`}</p>
            </div>
        </div>
    </div>
</div>
