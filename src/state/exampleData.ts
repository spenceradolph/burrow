import { AppState } from './state';

// TODO: remove from final release

export const defaultEmptyApp: AppState = {
    boxes: [],
    services: [],
    connections: [],
    tunnels: [],
    pivots: [],
    metaData: {
        serviceSetupIsActive: false,
        newService: {
            id: -1,
            boxId: -1,
            name: '',
            port: -1,
        },
        connectionSetupIsActive: false,
        newConnection: {
            id: -1,
            box1Id: -1,
            box1Port: -1,
            box2ServiceId: -1,
        },
        tunnelSetupIsActive: false,
        newTunnel: {
            id: -1,
            clientId: -1,
            clientPort: -1,
            hopServiceId: -1,
            targetServiceId: -1,
        },
        pivotSetupIsActive: false,
        newPivot: {
            id: -1,
            hopId: -1,
            hopPort: -1,
            targetService: -1,
        },
    },
};

export const exampleInitialState: AppState = {
    ...defaultEmptyApp,
    boxes: [
        { id: 1, name: 'Box1', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1', notes: '' },
        { id: 2, name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2', notes: '' },
        { id: 3, name: 'Box3', internalAddress: '1.0.0.3', externalAddress: '2.0.0.3', notes: '' },
    ],
    services: [
        { id: 1, boxId: 2, port: 22, name: 'SSH' },
        { id: 2, boxId: 3, port: 80, name: 'HTTP' },
    ],
    connections: [],
    tunnels: [
        {
            id: 1,
            clientId: 1,
            clientPort: 2222,
            hopServiceId: 1,
            targetServiceId: 2,
        },
    ],
};

// export const exampleInitialState: AppState = {
//     ...defaultEmptyApp,
//     boxes: [],
//     services: [],
//     connections: [],
//     tunnels: [],
// };
