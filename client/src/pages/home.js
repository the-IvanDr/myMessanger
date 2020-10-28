import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import toggleBlocks from '../functions/toggleMessages';
import { useHttp } from './../hooks/http.hook';
import useSocket from './../hooks/socket.hook';

import Navbar from '../containers/Navbar/Navbar';
import FlexWrapper from './../hoc/FlexWrapper';
import Messages from './../containers/Messages/Messages';
import Contacts from '../containers/Contacts/Contacts';
import VideoChat from '../containers/VideoChat/VideoChat';


export default function Home() {
    const { request } = useHttp();
    const socket = useSocket();
    const [jwtToken] = useState(useSelector(state => state.auth.jwtToken));
    const [userId] = useState(useSelector(state => state.auth.userId));

    // Данные о переписке (для отображения компонента <Messages />)
    const [messagesData, setMessagesData] = useState(null);

    // Инициализция пользователя по сокету
    useEffect(useCallback(() => {
        if (!socket) return;
        socket.initialUser({ userId });
    }, [userId, socket]));

    // Получить данные о переписке
    const getMessages = async (scndUserId) => {
        // Переключить компонент <Contacs /> на <Messages /> в мобильной верстке
        toggleBlocks();

        const res = await request(`/api/database/${jwtToken}/messages/${scndUserId}`, 'GET');
        setMessagesData(res);
    }


    return (
        <div className='home'>
            <Navbar />
            <FlexWrapper>
                <Contacts chooseContact={getMessages} socket={socket} />
                <Messages data={messagesData} socket={socket} />
            </FlexWrapper>
            <VideoChat />
        </div>
    )
}