import { AppState } from './state';

// TODO: remove from final release

const exampleBoxList: AppState['boxes'] = [
    {
        id: 1,
        name: 'Box1',
        internalAddress: '1.0.0.1',
        externalAddress: '2.0.0.1',
        services: [],
        connections: [
            {
                box2Id: 2,
                localPort: -1,
                port: 22,
            },
        ],
    },
    { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2', services: [{ name: 'SSH', port: 22 }], connections: [] },
    {
        id: 3,
        name: 'Box3',
        internalAddress: '1.0.0.2',
        externalAddress: '2.0.0.2',
        services: [{ name: 'HTTP', port: 80 }],
        connections: [],
    },
];

export const exampleInitialState: AppState = {
    boxes: exampleBoxList,
    servicePopup: {
        isActive: false,
        boxId: -1,
    },
    connectionSetup: {
        isActive: false,
        box1Id: -1,
        localPort: 4444,
    },
    tunnelSetup: {
        isActive: false,
        stage: 0,
        tunnel: {
            clientId: -1,
            clientPort: -1,
            hopId: -1,
            hopService: -1,
            targetId: -1,
            targetPort: -1,
        },
    },
    tunnels: [{ clientId: 1, clientPort: 2222, hopId: 2, hopService: 22, targetId: 3, targetPort: 80 }],
};
