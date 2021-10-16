import { Properties } from 'csstype';
import { Action } from '../StateManagement';
import { MenuButtonStyle } from './Menu';

const BoxStyle: Properties = {
    margin: '10px',
    padding: '10px',
    height: '15%',
    width: '10%',
    backgroundColor: 'yellow',
    float: 'left',
};

export type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
};

type BoxProps = {
    BoxData: BoxType;
    dispatch: React.Dispatch<Action>;
};

export const Box = (Props: BoxProps) => {
    const { BoxData, dispatch } = Props;
    const { id, name, internalAddress, externalAddress } = BoxData;

    const deleteSelf = () => {
        // Dispatched Actions have a 'type' and an optional 'payload' to be handled by the top-level reducer.
        dispatch({
            type: 'delete',
            payload: { id },
        });
    };

    return (
        <div style={BoxStyle}>
            <div>Name = {name}</div>
            <div>IntIP = {internalAddress}</div>
            <div>ExtIP = {externalAddress}</div>
            <button style={MenuButtonStyle}>Action 1</button>
            <button onClick={deleteSelf} style={MenuButtonStyle}>
                Delete
            </button>
        </div>
    );
};
