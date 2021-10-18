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
    dispatch: Dispatch;
};

export const Box = (Props: BoxProps) => {
    const { BoxData, dispatch } = Props;
    const { id, name, internalAddress, externalAddress } = BoxData;

    const deleteSelf = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete', id });
    };

    return (
        <Draggable onDrag={useXarrow()} onStop={useXarrow()}>
            <div style={BoxStyle} id={`${id}`}>
                <div style={{ ...parentBox, float: 'left' }}>
                    <div id={`box${id}left${1}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}left${2}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}left${3}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}left${4}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}left${5}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}left${6}`} style={portAnchorBoxStyle}></div>
                </div>
                <div style={{ ...parentBox, float: 'right' }}>
                    <div id={`box${id}right${1}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}right${2}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}right${3}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}right${4}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}right${5}`} style={portAnchorBoxStyle}></div>
                    <div id={`box${id}right${6}`} style={portAnchorBoxStyle}></div>
                </div>

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
