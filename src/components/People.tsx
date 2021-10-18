import React from 'react';
import {Person} from '.';
import {PersonType} from '../types';
import {getInitials} from '../utils';

type Props = {
    people: Array<PersonType>,
    loggedUserId: string,
    dispatch: Function,
}

export const People = (props: Props) => {
    const filteredPeople = props.people.filter(row => row.id !== props.loggedUserId);

    if (!filteredPeople.length) {
        return <div className="card-content py-2">There is nothing to display</div>
    }

    return <>{filteredPeople.map(row => <Person
        key={row.id}
        initials={getInitials(row.name, row.surname)}
        name={row.name}
        surname={row.surname}
        onClick={e => {e.preventDefault(); props.dispatch({type: 'setActivePerson', value: row.id})}}
    />)}</>
}
