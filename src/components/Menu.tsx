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

    const alertClick = (event: MouseEvent) => {
        event.stopPropagation();
        alert(`TODO: Implement ${event.currentTarget.innerHTML}`);
    };

    const saveToLocal = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'save-local' });
    };

    const clearLocal = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'clear-local' });
    };

    const clearBoxes = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'clear-app' });
    };

    const addBox = (event: MouseEvent) => {
        event.stopPropagation();
        const { boxes } = state;
        const newId = boxes.length ? boxes.slice(-1)[0].id + 1 : 1;
        const testBox: AppState['boxes'][0] = {
            id: newId,
            name: 'CHANGEME',
            internalAddress: '0.0.0.0',
            externalAddress: '0.0.0.0',
            services: [],
            connections: [],
        };
        dispatch({ type: 'add-box', box: testBox });
    };

    const cancelConnection = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: 'connect-cancel-action' });
    };

    return (
        <div style={{ ...MenuStyle, backgroundColor: state.connectionSetup.isActive ? 'yellow' : 'cyan' }}>
            <p>Menu Component</p>
            <button style={MenuButtonStyle} onClick={alertClick}>
                Import
            </button>
            <button style={MenuButtonStyle} onClick={alertClick}>
                Export
            </button>
            <button style={MenuButtonStyle} onClick={clearBoxes}>
                Clear All
            </button>
            <button style={MenuButtonStyle} onClick={addBox}>
                Add box
            </button>
            <button style={{ ...MenuButtonStyle, visibility: state.connectionSetup.isActive ? 'visible' : 'hidden' }} onClick={cancelConnection}>
                Cancel Connection
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
