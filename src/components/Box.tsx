import { Properties } from 'csstype';
import { MouseEvent } from 'react';
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

const portAnchorBoxStyle: Properties = {
    backgroundColor: 'black',
    position: 'relative',
    height: '9.5%',
    width: '100%',
    marginTop: '50%',
};

const parentBox: Properties = {
    height: '99.8%',
    width: '9%',
};

const centerStyle: Properties = {
    textAlign: 'center',
};

type BoxProps = {
    BoxData: AppState['boxes'][0];
    routes: AppState['routes'];
    dispatch: Dispatch;
};

export const Box = (Props: BoxProps) => {
    const { BoxData, dispatch, routes } = Props;
    const { id, name, internalAddress, externalAddress } = BoxData;

    const rightAnchorPoints = routes
        .filter(({ box1 }) => box1 === id)
        .map(({ port1 }) => <div id={`box${id}right${port1}`} style={portAnchorBoxStyle}></div>);

    const leftAnchorPoints = routes
        .filter(({ box2 }) => box2 === id)
        .map(({ port2 }) => <div id={`box${id}left${port2}`} style={portAnchorBoxStyle}></div>);

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete', id });
    };

    return (
        <Draggable onDrag={useXarrow()} onStop={useXarrow()}>
            <div style={BoxStyle} id={`${id}`}>
                <div style={{ ...parentBox, float: 'left' }}>{leftAnchorPoints}</div>
                <div style={{ ...parentBox, float: 'right' }}>{rightAnchorPoints}</div>
                <div style={centerStyle}>Name = {name}</div>
                <div style={centerStyle}>IntIP = {internalAddress}</div>
                <div style={centerStyle}>ExtIP = {externalAddress}</div>
                <button style={BoxButtonStyle}>Action 1</button>
                <button onClick={deleteSelf} style={BoxButtonStyle}>
                    Delete
                </button>
            </div>
        </Draggable>
    );
};
