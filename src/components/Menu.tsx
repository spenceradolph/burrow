import { Properties } from 'csstype';
import { MouseEvent } from 'react';
import { AppState, Dispatch } from '../state';

const MenuStyle: Properties = {
    height: '10%',
    width: '100%',
    backgroundColor: 'cyan',
};

const MenuButtonStyle: Properties = {
    padding: '5px',
    margin: '5px',
};

type MenuProps = {
    dispatch: Dispatch;
    state: AppState;
    myNewProps?: string;
};

export const Menu = (Props: MenuProps) => {
    const { dispatch, state } = Props;

    const saveToLocal = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'save-localstorage' });
    };

    const clearLocal = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete-localstorage' });
    };

    const clearBoxes = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'delete-all-objects' });
    };

    const cancelConnection = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'cancel-add-connection' });
    };

    const addBox = (event: MouseEvent) => {
        event.stopPropagation();
        const defaultBox: AppState['boxes'][0] = {
            id: state.boxes.length ? state.boxes.slice(-1)[0].id + 1 : 1,
            name: 'CHANGEME',
            internalAddress: '0.0.0.0',
            externalAddress: '0.0.0.0',
            notes: '',
        };
        dispatch({ type: 'add-box', boxToAdd: defaultBox });
    };

    const addTunnel = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'start-tunnel' });
    };

    const cancelTunnel = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'cancel-tunnel' });
    };

    const cancelPivot = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'cancel-add-pivot' });
    };

    return (
        <div
            style={{
                ...MenuStyle,
                backgroundColor: state.metaData.connectionSetupIsActive || state.metaData.tunnelSetupIsActive || state.metaData.pivotSetupIsActive ? 'yellow' : 'cyan',
            }}
        >
            <button style={MenuButtonStyle} onClick={clearBoxes}>
                Clear All
            </button>
            <button style={MenuButtonStyle} onClick={addBox}>
                Add box
            </button>
            <button style={MenuButtonStyle} onClick={addTunnel}>
                Add tunnel
            </button>
            <button style={{ ...MenuButtonStyle, visibility: state.metaData.tunnelSetupIsActive ? 'visible' : 'hidden' }} onClick={cancelTunnel}>
                cancel tunnel
            </button>
            <button style={{ ...MenuButtonStyle, visibility: state.metaData.connectionSetupIsActive ? 'visible' : 'hidden' }} onClick={cancelConnection}>
                Cancel Connection
            </button>
            <button style={{ ...MenuButtonStyle, visibility: state.metaData.pivotSetupIsActive ? 'visible' : 'hidden' }} onClick={cancelPivot}>
                Cancel Pivot
            </button>
            <button style={{ ...MenuButtonStyle, float: 'right' }} onClick={clearLocal}>
                Clear Local Storage
            </button>
            <button style={{ ...MenuButtonStyle, float: 'right' }} onClick={saveToLocal}>
                Save to Local Storage
            </button>
        </div>
    );
};
