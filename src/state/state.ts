import { exampleInitialState } from './exampleData';

type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
};

type ServiceType = {
    boxId: BoxType['id'];
    port: number;
    name: string;
};

type ConnectionType = {
    box1Id: BoxType['id'];
    box1Port: ServiceType['port'];
    box2Id: BoxType['id'];
    box2Port: ServiceType['port'];
};

type TunnelType = {
    clientId: BoxType['id'];
    clientPort: ServiceType['port']; // locally exposed listening port that gets forwarded to target
    hopId: BoxType['id'];
    hopPort: ServiceType['port']; // usually SSH
    targetId: BoxType['id'];
    targetPort: ServiceType['port'];
};

/**
 * Represents the entire application data / schema.
 */
export type AppState = {
    boxes: BoxType[];
    services: ServiceType[];
    connections: ConnectionType[];
    tunnels: TunnelType[];
    metaData: {
        serviceSetupIsActive: boolean; // display the popup / yellow
        newService: ServiceType; // TODO: port and name aren't actually stored here, they come from the action, consider refactoring this object? (or keep for simplicity) (same for similar values)
        connectionSetupIsActive: boolean; // display yellow
        newConnection: ConnectionType;
        tunnelSetupIsActive: boolean; // clicking stages
        newTunnel: TunnelType;
    };
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
