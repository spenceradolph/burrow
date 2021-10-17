import { exampleInitialState } from './exampleData';

type BoxType = {
    id: number;
    name: string;
    internalAddress: string;
    externalAddress: string;
};

type RouteType = {
    box1: BoxType['id'];
    box2: BoxType['id'];
    port1: number;
    port2: number;
};

/**
 * Represents the entire application data.
 */
export type AppState = {
    boxes: BoxType[];
    routes: RouteType[];
};

// Configure initial state from local storage (if possible)
export const LOCAL_STORAGE_ID = 'tunnel-tool-state';
const locallyStoredState = localStorage.getItem(LOCAL_STORAGE_ID);
export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : exampleInitialState;
