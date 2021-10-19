import { exampleInitialState } from './exampleData';

type ServiceType = {
    name: string;
    port: number;
};

type ConnectionType = {
    box2Id: BoxType['id'];
    port: ServiceType['port'];
    localPort: number;
};

type TunnelType = {
    clientId: BoxType['id'];
    clientPort: ServiceType['port'];
    hopId: BoxType['id'];
    hopService: ServiceType['port'];
    targetId: BoxType['id'];
    targetPort: ServiceType['port'];
};

type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
    services: ServiceType[];
    connections: ConnectionType[];
};

type ServicePopup = {
    isActive: boolean;
    boxId: BoxType['id'];
};

type ConnectionSetup = {
    isActive: boolean;
    box1Id: BoxType['id'];
    localPort: ConnectionType['port'];
};

/**
 * Represents the entire application data / schema.
 */
export type AppState = {
    boxes: BoxType[];
    servicePopup: ServicePopup;
    connectionSetup: ConnectionSetup;
    tunnelSetup: {
        isActive: boolean;
        stage: number;
        tunnel: TunnelType;
    };
    tunnels: TunnelType[];
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
