import { BoxType, RouteType } from "./components";

/**
 * Represents the entire application data.
 */
export type AppState = {
    boxes: BoxType[];
    routes: RouteType[];
}

/**
 * Any component can 'dispatch' an action to the StateReducer to change the state.
 */
export type Action = {
    type: string,
    payload?: any
}

/**
 * Function that takes the current state and an action, and returns a new state (based on the type of action provided).
 */
export const StateReducer = (currentState: AppState, action: Action): AppState => {
    const { type, payload } = action;

    const stateCopy: AppState = JSON.parse(JSON.stringify(currentState)); // Ensures complete copy of data without any references

    switch(type) {
        case 'delete':
            stateCopy.boxes = stateCopy.boxes.filter((BoxData, index) => {
                return BoxData.id !== payload.id; // TODO: create a type for this action that ensures ID exists within the payload...
            }) 
            return stateCopy;
        default:
            throw new Error('Unknown Type sent to StateReducer!')
    }
}