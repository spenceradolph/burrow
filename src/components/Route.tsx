import { Properties } from "csstype"
import { BoxType } from "./Box"

const RouteStyle: Properties = {}

export type RouteType = {
    box1: BoxType['id'];
    box2: BoxType['id'];
    port1: number;
    port2: number;
}

export const Route = (Props: RouteType & { dispatch: any }) => {
    const { box1, box2, port1, port2 } = Props;

    return (
        <div style={RouteStyle}>
            <p>Route from {box1}:{port1} to {box2}:{port2}</p>
        </div>
    )
}
