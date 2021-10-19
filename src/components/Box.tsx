import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent } from 'react';
import { default as Draggable } from 'react-draggable';
import Xarrow, { useXarrow } from 'react-xarrows';
import { AppState, Dispatch } from '../state';

const BoxStyle: Properties = {
    margin: '10px',
    marginRight: '200px',
    padding: '.1%',
    height: '15%',
    width: '10%',
    backgroundColor: 'yellow',
    float: 'left',
};

const BoxButtonStyle: Properties = {
    padding: '5px',
    margin: '5px',
};

const centerStyle: Properties = {
    textAlign: 'center',
};

type BoxProps = {
    BoxData: AppState['boxes'][0];
    dispatch: Dispatch;
    state: AppState;
};

export const Box = (Props: BoxProps) => {
    const { BoxData, dispatch, state } = Props;
    const { id, name, internalAddress, externalAddress, services, connections } = BoxData;

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete', id });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, name: event.target.value } });
    };

    const changeInternal = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, internalAddress: event.target.value } });
    };

    const changeExternal = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, externalAddress: event.target.value } });
    };

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'add-service', boxId: id });
    };

    const addConnection = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'connect-start-action', box1Id: id, localPort: -1 }); // TODO: handle local port options?
    };

    const clickService = (event: MouseEvent) => {
        event.stopPropagation();
        const servicePort = parseInt(event.currentTarget.getAttribute('data-port')!);

        if (state.tunnelSetup.isActive) {
            if (state.tunnelSetup.stage === 1) {
                dispatch({ type: 'tunnel-stage-2', box: BoxData, service: servicePort });
                return;
            }
            if (state.tunnelSetup.stage === 2) {
                dispatch({ type: 'tunnel-stage-3', box: BoxData, service: servicePort });
                return;
            }
        }

        if (state.connectionSetup.isActive) {
            dispatch({ type: 'connect-final-action', box2Id: id, servicePort });
            return;
        }

        if (!state.connectionSetup.isActive && !state.tunnelSetup.isActive) {
            dispatch({ type: 'delete-service-action', boxId: id, servicePort });
        }
    };

    const removeConnection = (event: MouseEvent) => {
        event.stopPropagation();
        if (!state.tunnelSetup.isActive) {
            const connection = JSON.parse(event.currentTarget.getAttribute('data-connection')!);
            dispatch({ type: 'connect-remove-action', boxId: id, connection });
        }
    };

    const boxClick = (event: MouseEvent) => {
        event.stopPropagation();
        if (state.tunnelSetup.isActive) {
            if (state.tunnelSetup.stage === 0) {
                dispatch({ type: 'tunnel-stage-0', box: BoxData });
            }
        }
    };

    const tunnelHopPoints = state.tunnels
        .filter((tunnel) => {
            return tunnel.hopId === id;
        })
        .map((tunnel, index) => {
            return (
                <>
                    <p style={{ textAlign: 'center' }}>Service: {tunnel.hopService}</p>
                    <div key={index} id={`tunnelHop-${JSON.stringify(tunnel)}}`} style={{ textAlign: 'center' }} />
                </>
            );
        });

    const tunnelClientPoints = state.tunnels
        .filter((tunnel) => {
            return tunnel.clientId === id;
        })
        .map((tunnel, index) => {
            return (
                <div key={index} id={`tunnelClient-${JSON.stringify(tunnel)}`} style={{ position: 'relative', float: 'right' }}>
                    <input type="number" value="2222" style={{ width: '50px' }} />
                </div>
            );
        });

    return (
        <Draggable onDrag={useXarrow()} onStop={useXarrow()}>
            <div style={{ ...BoxStyle }} onClick={boxClick}>
                Name:
                <input type={'text'} value={name} onChange={changeName} style={{ ...centerStyle, marginLeft: '30px' }} />
                InternalIP: <input type={'text'} value={internalAddress} onChange={changeInternal} style={centerStyle} />
                ExternalIP: <input type={'text'} value={externalAddress} onChange={changeExternal} style={centerStyle} />
                <br />
                <button onClick={deleteSelf} style={BoxButtonStyle}>
                    Delete
                </button>
                <button onClick={addService} style={BoxButtonStyle}>
                    Add Service
                </button>
                <button onClick={addConnection} style={BoxButtonStyle}>
                    Connect
                </button>
                {services.map((service, index) => {
                    return (
                        <div key={index} id={`box${id}serviceport${service.port}`} data-port={service.port} onClick={clickService}>
                            {service.name}:{service.port}
                        </div>
                    );
                })}
                {connections.map((connection, index) => {
                    const style: Properties = { position: 'relative', float: 'right' };
                    return (
                        <div key={index} id={`box${id}connectionport${connection.localPort}`} data-connection={JSON.stringify(connection)} onClick={removeConnection} style={style}>
                            {connection.localPort === -1 ? 'x' : connection.localPort}
                        </div>
                    );
                })}
                {connections.map((connection, index) => (
                    <Xarrow key={index} start={`box${id}connectionport${connection.localPort}`} end={`box${connection.box2Id}serviceport${connection.port}`} />
                ))}
                {tunnelClientPoints}
                {tunnelHopPoints}
            </div>
        </Draggable>
    );
};
