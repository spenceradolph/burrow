import { AppState } from './state';

// TODO: remove from final release

export const defaultEmptyApp: AppState = {
    boxes: [],
    services: [],
    connections: [],
    tunnels: [],
    metaData: {
        serviceSetupIsActive: false,
        newService: {
            boxId: -1,
            name: '',
            port: -1,
        },
        connectionSetupIsActive: false,
        newConnection: {
            box1Id: -1,
            box1Port: -1,
            box2Id: -1,
            box2Port: -1,
        },
        tunnelSetupIsActive: false,
        newTunnel: {
            clientId: -1,
            clientPort: -1,
            hopId: -1,
            hopPort: -1,
            targetId: -1,
            targetPort: -1,
        },
    },
};

export const exampleInitialState: AppState = {
    ...defaultEmptyApp,
    boxes: [
        { id: 1, name: 'Box1', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1' },
        { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2' },
        { id: 3, name: 'Box3', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2' },
    ],
    services: [
        { boxId: 2, port: 22, name: 'SSH' },
        { boxId: 3, port: 80, name: 'HTTP' },
    ],
    connections: [],
    tunnels: [],
};

// export const exampleInitialState: AppState = {
//     ...defaultEmptyApp,
//     boxes: [],
//     services: [],
//     connections: [],
//     tunnels: [],
// };
