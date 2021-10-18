import { AppState } from './state';

// TODO: remove from final release

const exampleBoxList: AppState['boxes'] = [
    { id: 1, name: 'Box1', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1' },
    { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2' },
];

const exampleRouteList: AppState['routes'] = [
    { box1: 1, port1: 1000, box2: 2, port2: 2000 },
    // { box1: 1, port1: 3000, box2: 2, port2: 4000 },
];

export const exampleInitialState: AppState = {
    boxes: exampleBoxList,
    routes: exampleRouteList,
};
