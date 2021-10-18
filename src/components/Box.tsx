import { Properties } from 'csstype';
import { ChangeEvent, MouseEvent } from 'react';
import { default as Draggable } from 'react-draggable';
import { useXarrow } from 'react-xarrows';
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
    const { id, name, internalAddress, externalAddress, services } = BoxData;

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete', id });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) => dispatch({type: 'edit-box', editedBox: { ...BoxData, name: event.currentTarget.value }});
    const changeInternal = (event: ChangeEvent<HTMLInputElement>) => dispatch({type: 'edit-box', editedBox: { ...BoxData, internalAddress: event.currentTarget.value }});
    const changeExternal = (event: ChangeEvent<HTMLInputElement>) => dispatch({type: 'edit-box', editedBox: { ...BoxData, externalAddress: event.currentTarget.value }});

    const addService = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({type: 'add-service', boxId: id})
    }

    const serviceDivs = services.map((service) => {
        return <div>{service.name}:{service.port}</div>
    })

    return (
        <Draggable onDrag={useXarrow()} onStop={useXarrow()}>
            <div style={BoxStyle} id={`${id}`}>
                Name:<input type={'text'} style={{...centerStyle, marginLeft: '30px'}} value={name} onChange={changeName} />
                InternalIP: <input type={'text'} style={centerStyle} value={internalAddress} onChange={changeInternal} />
                ExternalIP: <input type={'text'} style={centerStyle} value={externalAddress} onChange={changeExternal} />
                <br />
                <button onClick={deleteSelf} style={BoxButtonStyle}>
                    Delete
                </button>
                <button style={BoxButtonStyle} onClick={addService}>Add Service</button>
                <button style={BoxButtonStyle}>Connect</button>
                {serviceDivs}
                
            </div>
        </Draggable>
    );
};
