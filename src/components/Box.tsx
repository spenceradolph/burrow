import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent } from 'react';
import { default as Draggable } from 'react-draggable';
import { useXarrow } from 'react-xarrows';
import { AppState, defaultEmptyApp, Dispatch } from '../state';

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
    const { id, name, internalAddress, externalAddress } = BoxData;
    const { services, connections } = state;

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete-box', boxToDelete: BoxData });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', boxToEdit: { ...BoxData, name: event.target.value } });
    };

    const changeInternal = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', boxToEdit: { ...BoxData, internalAddress: event.target.value } });
    };

    const changeExternal = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-box', boxToEdit: { ...BoxData, externalAddress: event.target.value } });
    };

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'start-add-service', boxToAddService: BoxData });
    };

    const addConnection = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'start-add-connection', box1: BoxData }); // TODO: handle local port options?
    };

    const clickService = (event: MouseEvent) => {
        event.stopPropagation();
        const service: AppState['services'][0] = JSON.parse(event.currentTarget.getAttribute('data-service')!);

        if (state.metaData.tunnelSetupIsActive) {
            if (state.metaData.newTunnel.clientId !== defaultEmptyApp.metaData.newTunnel.clientId && state.metaData.newTunnel.hopId === defaultEmptyApp.metaData.newTunnel.hopId) {
                dispatch({ type: 'tunnel-stage-1', hopService: service });
                return;
            }
            if (state.metaData.newTunnel.hopId !== defaultEmptyApp.metaData.newTunnel.hopId) {
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

    const removeConnection = (event: MouseEvent) => {
        event.stopPropagation();
        if (!state.metaData.tunnelSetupIsActive) {
            const connection = JSON.parse(event.currentTarget.getAttribute('data-connection')!);
            dispatch({ type: 'delete-connection', connectionToRemove: connection });
        }
    };

    const boxClick = (event: MouseEvent) => {
        event.stopPropagation();
        if (state.metaData.tunnelSetupIsActive) {
            if (state.metaData.newTunnel.clientId === defaultEmptyApp.metaData.newTunnel.clientId) {
                dispatch({ type: 'tunnel-stage-0', clientBox: BoxData });
            }
        }
    };

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

    const tunnelHopPoints = state.tunnels
        .filter((tunnel) => {
            return tunnel.hopId === id;
        })
        .map((tunnel, index) => {
            return (
                <>
                    <p style={{ textAlign: 'center' }}>Service: {tunnel.hopPort}</p>
                    <div key={index} id={`tunnelHop-${JSON.stringify(tunnel)}}`} style={{ textAlign: 'center' }} />
                </>
            );
        });

    const serviceComponents = services
        .filter((thisService) => {
            return thisService.boxId === id;
        })
        .map((thisService, index) => {
            // TODO: change how the id's are configured and try to only use JSON.stringify for the entire id if possible (connection component doesn't know the name of service tho...)
            return (
                <div key={index} id={`service-${thisService.boxId}-${thisService.port}`} data-service={JSON.stringify(thisService)} onClick={clickService}>
                    {thisService.name}:{thisService.port}
                </div>
            );
        });

    const connectionStartPoints = connections
        .filter((thisConn) => {
            return thisConn.box1Id === id;
        })
        .map((thisConn, index) => {
            const style: Properties = { position: 'relative', float: 'right' };
            return (
                <div key={index} id={`connection-${JSON.stringify(thisConn)}`} data-connection={JSON.stringify(thisConn)} onClick={removeConnection} style={style}>
                    {thisConn.box1Port === -1 ? 'x' : thisConn.box1Port}
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
                {serviceComponents}
                {connectionStartPoints}
                {tunnelClientPoints}
                {tunnelHopPoints}
            </div>
        </Draggable>
    );
};
