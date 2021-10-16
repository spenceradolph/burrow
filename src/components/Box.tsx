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
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
}

export const Box = (Props: { BoxData: BoxType, dispatch: any }) => {
    const { dispatch } = Props;
    const { id, name, internalAddress, externalAddress } = Props.BoxData;

    // Actions have a 'type' and an optional 'payload' to be handled by the top-level reducer.
    const deleteAction = {
        type: 'delete',
        payload: { id }
    }

    return (
        <div style={BoxStyle}>
            <div>Name = {name}</div>
            <div>IntIP = {internalAddress}</div>
            <div>ExtIP = {externalAddress}</div>
            <button style={MenuButtonStyle}>Action 1</button>
            <button onClick={() => dispatch(deleteAction)} style={MenuButtonStyle}>Delete</button>
        </div>
    )
}
