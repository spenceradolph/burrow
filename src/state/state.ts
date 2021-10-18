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
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
