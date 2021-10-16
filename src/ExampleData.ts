import { BoxType, RouteType } from './components';

/**
 * Example Boxes
 */
export const exampleBoxList: BoxType[] = [
    { id: 1, name: 'Box1', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1' },
    { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2' },
];

/**
 * Example Routes
 */
export const exampleRouteList: RouteType[] = [{ box1: 1, port1: 3000, box2: 2, port2: 5000 }];
