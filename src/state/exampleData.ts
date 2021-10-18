import { AppState } from './state';

// TODO: remove from final release

const exampleBoxList: AppState['boxes'] = [
    {
        id: 1,
        name: 'Box1',
        internalAddress: '1.0.0.1',
        externalAddress: '2.0.0.1',
        services: [],
        connections: [],
    },
    { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2', services: [{ name: 'SSH', port: 22 }], connections: [] },
];

export const exampleInitialState: AppState = {
    boxes: exampleBoxList,
    servicePopup: {
        isHidden: true,
        name: 'ServiceName',
        port: 0,
        boxId: -1,
    },
    connectionSetup: {
        isActive: false,
        box1Id: -1,
        localPort: 4444,
    },
};
