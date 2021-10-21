import React from 'react';
import ReactDOM from 'react-dom'

type Props = {
    children: React.ReactNode,
}

const modalRoot = document.getElementById('modal-root')

if (!modalRoot) {
    throw new Error('Modal Root does not exist')
}

export const Portal = (props: Props) => ReactDOM.createPortal(
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            {props.children}
        </div>
    </div>,
    modalRoot,
)
