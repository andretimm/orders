import React from 'react';

export const Options = {
    timeout: 5000,
    position: "top center",
    containerStyle: {
        width: '50%'
    }
};

const alertStyle = {
    backgroundColor: '#151515',
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '100%',
    boxSizing: 'border-box',
}

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}


export const AlertTemplate = ({ style, options, message, close }) => (
    <div style={{ ...alertStyle, ...style }}>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#FF0040'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{ marginRight: true ? '20px' : '0', minWidth: 24 }}
        >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='12' />
            <line x1='12' y1='16' x2='12' y2='16' />
        </svg>
        <span style={{ flex: 2 }}>{message}</span>
        <button onClick={close} style={buttonStyle}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#FFFFFF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                style={{ marginRight: false ? '20px' : '0', minWidth: 24 }}
            >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
        </button>
    </div>
)