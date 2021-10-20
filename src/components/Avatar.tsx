import React from "react";
import styled from 'styled-components'

type Props = {
    initials?: string,
    size?: number,
}

export const Avatar = ({initials = '', size = 32}: Props) => <FigureEl size={size} initials={initials}>
    <span>{initials}</span>
</FigureEl>

const FigureEl = styled.figure<Props>`
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({size}) => size ? size/2 : 16}px;
        height: ${props => props.size}px;
        width: ${props => props.size}px;
        border-radius: ${({size}) => size ? size/2 : 16}px;
        color: #fff;
        background-color: ${({initials})=> initials ? '#7a7a7a' : 'transparent'};
        margin-right: 1rem;
    }
`;
