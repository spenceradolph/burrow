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
};

export const Box = (Props: BoxProps) => {
    const { BoxData, dispatch } = Props;
    const { id, name, internalAddress, externalAddress, services, connections } = BoxData;

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete', id });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, name: event.currentTarget.value } });
    const changeInternal = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, internalAddress: event.currentTarget.value } });
    const changeExternal = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'edit-box', editedBox: { ...BoxData, externalAddress: event.currentTarget.value } });

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'add-service', boxId: id });
    };

    const addConnection = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'connect-start-action', box1Id: id, localPort: 4444 }); // TODO: handle local port options?
    };

    const submitConnection = (event: MouseEvent, servicePort: number) => {
        event.stopPropagation();
        dispatch({ type: 'connect-final-action', box2Id: id, servicePort });
    };

    const removeConnection = (event: MouseEvent, connection: AppState['boxes'][0]['connections'][0]) => {
        event.stopPropagation();
        dispatch({ type: 'connect-remove-action', boxId: id, connection });
    };

    const serviceDivs = services.map((service) => {
        return (
            <div
                onClick={(event) => {
                    submitConnection(event, service.port);
                }}
                id={`box${id}serviceport${service.port}`}
            >
                {service.name}:{service.port}
            </div>
        );
    });

    const connectionDivs = connections.map((connection) => {
        return (
            <div
                onClick={(event) => removeConnection(event, connection)}
                style={{ position: 'relative', float: 'right' }}
                id={`box${id}connectionport${connection.localPort}`}
            >
                {connection.localPort}
            </div>
        );
    });

    const connectionArrows = connections.map((connection) => {
        return <Xarrow start={`box${id}connectionport${connection.localPort}`} end={`box${connection.box2Id}serviceport${connection.port}`} />;
    });

    return (
        <Draggable onDrag={useXarrow()} onStop={useXarrow()}>
            <div style={BoxStyle} id={`${id}`}>
                Name:
                <input type={'text'} style={{ ...centerStyle, marginLeft: '30px' }} value={name} onChange={changeName} />
                InternalIP: <input type={'text'} style={centerStyle} value={internalAddress} onChange={changeInternal} />
                ExternalIP: <input type={'text'} style={centerStyle} value={externalAddress} onChange={changeExternal} />
                <br />
                <button onClick={deleteSelf} style={BoxButtonStyle}>
                    Delete
                </button>
                <button style={BoxButtonStyle} onClick={addService}>
                    Add Service
                </button>
                <button style={BoxButtonStyle} onClick={addConnection}>
                    Connect
                </button>
                {serviceDivs}
                {connectionDivs}
                {connectionArrows}
            </div>
        </Draggable>
    );
};
