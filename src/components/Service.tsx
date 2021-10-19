import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AppState, defaultEmptyApp, Dispatch } from '../state';

type ServiceProps = {
    state: AppState;
    dispatch: Dispatch;
    service: AppState['services'][0];
};

export const Service = (Props: ServiceProps) => {
    const { service, state, dispatch } = Props;
    const { port, name } = service;

    const clickService = (event: any) => {
        event.stopPropagation();
        if (state.metaData.tunnelSetupIsActive) {
            if (
                state.metaData.newTunnel.clientId !== defaultEmptyApp.metaData.newTunnel.clientId &&
                state.metaData.newTunnel.hopServiceId === defaultEmptyApp.metaData.newTunnel.hopServiceId
            ) {
                dispatch({ type: 'tunnel-stage-1', hopService: service });
                return;
            }
            if (state.metaData.newTunnel.hopServiceId !== defaultEmptyApp.metaData.newTunnel.hopServiceId) {
                dispatch({ type: 'tunnel-stage-2', targetService: service });
                return;
            }
        }

        if (state.metaData.connectionSetupIsActive) {
            dispatch({ type: 'add-connection', serviceToConnect: service });
            return;
        }

        if (!state.metaData.connectionSetupIsActive && !state.metaData.tunnelSetupIsActive && !state.metaData.serviceSetupIsActive) {
            dispatch({ type: 'delete-service', serviceToDelete: service });
        }
    };

    return (
        <div id={`service-${service.id}`} data-service={JSON.stringify(service)} onClick={clickService}>
            {name}:{port}
        </div>
    );
};

const PopupStyle: Properties = {
    backgroundColor: 'purple',
    top: '30%',
    left: '40%',
    height: '30%',
    width: '30%',
    position: 'absolute',
    zIndex: 1,
};

type ServicePopupProps = {
    state: AppState;
    dispatch: Dispatch;
};

export const ServicePopup = (Props: ServicePopupProps) => {
    const { state, dispatch } = Props;
    const { serviceSetupIsActive, newService } = state.metaData;

    const [name, setName] = useState('ServiceName');
    const [port, setPort] = useState(22);

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        const serviceId: AppState['services'][0]['id'] = state.services.length ? state.services.slice(-1)[0].id + 1 : 1;
        dispatch({ type: 'add-service', serviceToAdd: { ...newService, name, port, id: serviceId } });
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
        <div style={{ ...PopupStyle, visibility: serviceSetupIsActive ? 'visible' : 'hidden' }}>
            Name: <input type={'text'} value={name} onChange={changeName} />
            <br />
            Port: <input type={'number'} value={port} onChange={changePort} />
            <br />
            <button onClick={addService}>Add Service</button>
            <button onClick={closePopup}>Exit</button>
        </div>
    );
};
