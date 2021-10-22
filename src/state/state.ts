import { exampleInitialState } from './exampleData';

type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
    notes: string;
};

type ServiceType = {
    id: number;
    boxId: BoxType['id'];
    port: number;
    name: string;
};

type ConnectionType = {
    id: number;
    box1Id: BoxType['id'];
    box1Port: ServiceType['port'];
    box2ServiceId: ServiceType['id'];
};

type TunnelType = {
    id: number;
    clientId: BoxType['id'];
    clientPort: ServiceType['port']; // locally exposed listening port that gets forwarded to target
    hopServiceId: ServiceType['id'];
    targetServiceId: ServiceType['id'];
};

type PivotType = {
    id: number;
    hopId: BoxType['id'];
    hopPort: ServiceType['port']; // TODO: refactor this
    targetService: ServiceType['id'];
    hopService: ServiceType['id'];
};

/**
 * Represents the entire application data / schema.
 */
export type AppState = {
    boxes: BoxType[];
    services: ServiceType[];
    connections: ConnectionType[];
    tunnels: TunnelType[];
    pivots: PivotType[];
    metaData: {
        serviceSetupIsActive: boolean; // display the popup / yellow
        newService: ServiceType; // TODO: port and name aren't actually stored here, they come from the action, consider refactoring this object? (or keep for simplicity) (same for similar values)
        connectionSetupIsActive: boolean; // display yellow
        newConnection: ConnectionType;
        tunnelSetupIsActive: boolean; // clicking stages
        newTunnel: TunnelType;
        pivotSetupIsActive: boolean;
        newPivot: PivotType;
    };
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
