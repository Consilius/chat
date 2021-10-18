import React from 'react';
import {PersonType} from '../types';
import {getInitials} from '../utils';
import {Favorite} from '.';

type Props = {
    people: Array<PersonType>,
    loggedUser: any,
    dispatch: Function,
}

export const Favorites = (props: Props) => {
    const filteredPeople = props.people.filter(row => props.loggedUser.hasFavorites.find(fId => fId === row.id));

    if (!filteredPeople.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredPeople.map(row => <Favorite
        key={row.id}
        initials={getInitials(row.name, row.surname)}
        name={row.name}
        surname={row.surname}
        firstLine='aaaa'
        onClick={e => {e.preventDefault(); props.dispatch({type: 'setActivePerson', value: row.id})}}
    />)}</>
}