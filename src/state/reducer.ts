import { AppAction } from './actions';
import { AppState, LOCAL_STORAGE_ID } from './state';

/**
 * A Reducer is a function that takes the current state and an action, and returns a new state (based on the type of action provided).
 */
export const reducer = (currentState: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'clear-app': {
            return { ...currentState, boxes: [] };
        }

        case 'delete': {
            const boxes = currentState.boxes.filter(({ id }) => id !== action.id);
            return { ...currentState, boxes };
        }

        case 'save-local': {
            localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(currentState));
            return currentState;
        }

        case 'clear-local': {
            localStorage.removeItem(LOCAL_STORAGE_ID);
            return currentState;
        }

        case 'add-box': {
            const boxes = [ ...currentState.boxes, action.box ];
            return { ...currentState, boxes }
        }

        case 'edit-box': {
            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== action.editedBox.id) return currentBox;
                return action.editedBox;
            });

            return { ...currentState, boxes }
        }

        case 'edit-service': {
            return {...currentState, servicePopup: action.editedPopup}
        }

        case 'cancel-add-service': {
            return {...currentState, servicePopup: {...currentState.servicePopup, isHidden: true}}
        }

        case 'add-service': {
            return {...currentState, servicePopup: {...currentState.servicePopup, isHidden: false, boxId: action.boxId}}
        }

        case 'submit-service': {
            const boxes = currentState.boxes.map((currentbox) => {
                if (currentState.servicePopup.boxId !== currentbox.id) return currentbox;
                return {...currentbox, services: [...currentbox.services, action.service]}
            });
            return {...currentState, servicePopup: {...currentState.servicePopup, isHidden: true}, boxes }
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
