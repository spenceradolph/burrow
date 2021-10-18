import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent } from 'react';
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
    const { dispatch } = Props;
    const { isHidden, name, port, boxId } = Props.servicePopup;

    const visibility = isHidden ? 'hidden' : 'visible';

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'edit-service', editedPopup: { boxId, isHidden, name: event.currentTarget.value, port } });
    const changePort = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'edit-service', editedPopup: { boxId, isHidden, name, port: parseInt(event.currentTarget.value) } });

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({
            type: 'submit-service',
            service: {
                name,
                port,
            },
        });
    };

    const closePopup = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'cancel-add-service' });
    };

    return (
        <div style={{ ...PopupStyle, visibility }}>
            Box we are changing: {boxId}
            Name: <input type={'text'} value={name} onChange={changeName} />
            Port: <input type={'number'} value={port} onChange={changePort} />
            <button onClick={addService}>Add Service</button>
            <button onClick={closePopup}>Exit</button>
        </div>
    );
};
