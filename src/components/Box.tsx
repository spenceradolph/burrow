import { Properties } from "csstype";
import { MenuButtonStyle } from "./Menu";

const BoxStyle: Properties = {
    margin: "10px",
    padding: "10px",
    height: "15%",
    width: "10%",
    backgroundColor: "yellow",
    float: "left"
}

export type BoxType = {
    name: string;
    internalAddress: string;
    externalAddress: string;
}

export const Box = (Props: BoxType) => {
    const { name, internalAddress, externalAddress } = Props;

    return (
        <div style={BoxStyle}>
            <div>Name = {name}</div>
            <div>IntIP = {internalAddress}</div>
            <div>ExtIP = {externalAddress}</div>
            <button style={MenuButtonStyle}>Action 1</button>
            <button style={MenuButtonStyle}>Action 2</button>
        </div>
    )
}
