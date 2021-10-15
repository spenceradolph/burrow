import { Properties } from 'csstype';
import { MouseEvent } from 'react';

const MenuStyle: Properties = {
    height: "10%",
    width: "100%",
    backgroundColor: "cyan"
}

export const MenuButtonStyle: Properties = {
    padding: "5px",
    margin: "5px"
}

const onClick = (event: MouseEvent) => {
    event.preventDefault();
    alert(`TODO: Implement ${event.currentTarget.innerHTML}`);
    event.stopPropagation(); // Don't trigger click action on parent component
}

export const Menu = () => {
    return (
        <div style={MenuStyle}>
            <p>Menu Component</p>
            <button style={MenuButtonStyle} onClick={onClick}>Import</button>
            <button style={MenuButtonStyle} onClick={onClick}>Export</button>
            <button style={MenuButtonStyle} onClick={onClick}>New Box</button>
        </div>
    )
}
