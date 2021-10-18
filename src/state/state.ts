import { exampleInitialState } from './exampleData';

type ServiceType = {
    name: string;
    port: number;
}

type ConnectionType = {
    boxId: BoxType['id'];
    service: ServiceType;
    localPort?: number;
}

type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
    services: ServiceType[];
    connections: ConnectionType[];
};

type ServicePopup = {
    isHidden: boolean,
    boxId: BoxType['id'],
    name: ServiceType['name'],
    port: ServiceType['port']
}

/**
 * Represents the entire application data / schema.
 */
export type AppState = {
    boxes: BoxType[];
    servicePopup: ServicePopup
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
