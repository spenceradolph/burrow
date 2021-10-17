import { Properties } from 'csstype';
import { MouseEvent } from 'react';
import { Dispatch } from '../state';

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
};

export const Menu = (Props: MenuProps) => {
    const { dispatch } = Props;

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

    return (
        <div style={MenuStyle}>
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
            <button style={{ ...MenuButtonStyle, float: 'right' }} onClick={clearLocal}>
                Clear Local Storage
            </button>
            <button style={{ ...MenuButtonStyle, float: 'right' }} onClick={saveToLocal}>
                Save to Local Storage
            </button>
        </div>
    );
};
