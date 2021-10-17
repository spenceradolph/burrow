import { Properties } from 'csstype';
import { MouseEvent } from 'react';
import { AppState, DeleteAction, Dispatch } from '../state';

const BoxStyle: Properties = {
    margin: '10px',
    padding: '10px',
    height: '15%',
    width: '10%',
    backgroundColor: 'yellow',
    float: 'left',
};

const BoxButtonStyle: Properties = {
    padding: '5px',
    margin: '5px',
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
        const action: DeleteAction = {
            type: 'delete',
            id,
        };
        dispatch(action);
    };

    return (
        <div style={BoxStyle}>
            <div>Name = {name}</div>
            <div>IntIP = {internalAddress}</div>
            <div>ExtIP = {externalAddress}</div>
            <button style={BoxButtonStyle}>Action 1</button>
            <button onClick={deleteSelf} style={BoxButtonStyle}>
                Delete
            </button>
        </div>
    );
};
