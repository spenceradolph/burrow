import { AppAction } from './actions';
import { AppState, LOCAL_STORAGE_ID } from './state';

/**
 * A Reducer is a function that takes the current state and an action, and returns a new state (based on the type of action provided).
 */
export const reducer = (currentState: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'clear-app': {
            return { ...currentState, boxes: [], routes: [] };
        }

        case 'delete': {
            const boxes = currentState.boxes.filter(({ id }) => id !== action.id);
            const routes = currentState.routes.filter(({ box1, box2 }) => box1 !== action.id && box2 !== action.id);
            return { ...currentState, boxes, routes };
        }

        case 'save-local': {
            localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(currentState));
            return currentState;
        }

        case 'clear-local': {
            localStorage.removeItem(LOCAL_STORAGE_ID);
            return currentState;
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
