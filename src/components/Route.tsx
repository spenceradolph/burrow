import { Properties } from 'csstype';
import { AppState } from '../state';

const RouteStyle: Properties = {
    backgroundColor: 'white',
};

type RouteProps = {
    RouteData: AppState['routes'][0];
};

export const Route = (Props: RouteProps) => {
    const { box1, box2, port1, port2 } = Props.RouteData;

    return (
        <div style={RouteStyle}>
            <p>
                Route from {box1}:{port1} to {box2}:{port2}
            </p>
        </div>
    );
};
