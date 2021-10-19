import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AppState, Dispatch } from '../state';

const PopupStyle: Properties = {
    backgroundColor: 'purple',
    top: '30%',
    left: '40%',
    height: '30%',
    width: '30%',
    position: 'absolute',
    zIndex: 1,
};

type PopupProps = {
    servicePopup: AppState['servicePopup'];
    dispatch: Dispatch;
};

export const Popup = (Props: PopupProps) => {
    const { dispatch, servicePopup } = Props;
    const { isActive } = servicePopup;

    const [name, setName] = useState('ServiceName');
    const [port, setPort] = useState(0);

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'submit-service', service: { name, port } });
    };

    const closePopup = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'cancel-add-service' });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setName(event.target.value);
    };

    const changePort = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setPort(parseInt(event.target.value));
    };

    return (
        <div style={{ ...PopupStyle, visibility: isActive ? 'visible' : 'hidden' }}>
            Name: <input type={'text'} value={name} onChange={changeName} />
            <br />
            Port: <input type={'number'} value={port} onChange={changePort} />
            <br />
            <button onClick={addService}>Add Service</button>
            <button onClick={closePopup}>Exit</button>
        </div>
    );
};
