import { MouseEvent } from 'react';
import Xarrow from 'react-xarrows';
import { AppState } from '../state';

type RouteProps = {
    RouteData: AppState['routes'][0];
};

export const Route = (Props: RouteProps) => {
    const { box1, box2, port1, port2 } = Props.RouteData;

    return (
        <Xarrow
            start={`box${box1}right${port1}`}
            end={`box${box2}left${port2}`}
            labels={{ start: `${port1}`, end: `${port2}` }}
            divContainerProps={{
                onClick: (event: MouseEvent) => {
                    event.stopPropagation();
                    alert('clicked tunnel');
                },
                title: 'tunnel type x',
            }}
        />
    );
};
