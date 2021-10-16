import { Properties } from 'csstype';
import { MouseEvent } from 'react';
import { AppState } from '../StateManagement';

const MenuStyle: Properties = {
    height: '10%',
    width: '100%',
    backgroundColor: 'cyan',
};

export const MenuButtonStyle: Properties = {
    padding: '5px',
    margin: '5px',
};

export const Menu = (Props: { state: AppState }) => {
    const alertClick = (event: MouseEvent) => {
        event.preventDefault();
        alert(`TODO: Implement ${event.currentTarget.innerHTML}`);
        event.stopPropagation(); // Don't trigger click action on parent component
    };

    const saveToLocal = () => localStorage.setItem('tunnel-tool-state', JSON.stringify(Props.state));
    const clearLocal = () => localStorage.removeItem('tunnel-tool-state');

    return (
        <div style={MenuStyle}>
            <p>Menu Component</p>
            <button style={MenuButtonStyle} onClick={alertClick}>
                Import
            </button>
            <button style={MenuButtonStyle} onClick={alertClick}>
                Export
            </button>
            <button style={MenuButtonStyle} onClick={alertClick}>
                New Box
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
