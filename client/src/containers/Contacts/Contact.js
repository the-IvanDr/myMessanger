import React from 'react';
import './Contacts.scss';

export default function Contact({ img, name, time, lastMessage, onClick, newMessage, isOnline }) {
    return (
        <div className='contact' onClick={onClick}>
            <div className={`contact__avatar-wrapper ${isOnline ? 'online' : ''}`}>
                <span className='contact__img'>
                    <img src={img} alt='user' />
                </span>
            </div>
            <div className='contact__flex-wrapper'>
                <div className="contact__title">
                    <div className='contact__name'>{name}</div>
                    <div className='contact__time'>{time}</div>
                </div>

                <div className='contact__last-message'>
                    {/* <span className='contact__last-message__who'>Рак:</span> */}
                    {newMessage || lastMessage}
                </div>
            </div>
        </div>
    );
}