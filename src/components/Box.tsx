import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent } from 'react';
import { default as Draggable } from 'react-draggable';
import { useXarrow } from 'react-xarrows';
import { ConnectionStartPoint, Service, TunnelClientPoint, TunnelHopPoint } from '../components';
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

    const boxClick = (event: MouseEvent) => {
        event.stopPropagation();
        if (state.metaData.tunnelSetupIsActive) {
            if (state.metaData.newTunnel.clientId === defaultEmptyApp.metaData.newTunnel.clientId) {
                dispatch({ type: 'tunnel-stage-0', clientBox: BoxData });
            }
        }
    };

    const tunnelClientPoints = state.tunnels
        .filter((tunnel) => tunnel.clientId === id)
        .map((tunnel, index) => {
            return <TunnelClientPoint key={index} tunnel={tunnel} dispatch={dispatch} />;
        });

    const serviceIdsForThisBox = state.services.filter((thisService) => thisService.boxId === id).map((thisService) => thisService.id);
    const tunnelHopPoints = state.tunnels
        .filter((tunnel) => serviceIdsForThisBox.includes(tunnel.hopServiceId))
        .map((tunnel, index) => {
            return <TunnelHopPoint key={index} tunnel={tunnel} state={state} dispatch={dispatch} />;
        });

    const serviceComponents = services
        .filter((thisService) => thisService.boxId === id)
        .map((thisService, index) => {
            return <Service key={index} service={thisService} state={state} dispatch={dispatch} />;
        });

    const connectionStartPoints = connections
        .filter((thisConn) => thisConn.box1Id === id)
        .map((thisConn, index) => {
            return <ConnectionStartPoint key={index} connection={thisConn} state={state} dispatch={dispatch} />;
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
