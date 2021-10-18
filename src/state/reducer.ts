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
            const boxes = [...currentState.boxes, action.box];
            return { ...currentState, boxes };
        }

        case 'edit-box': {
            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== action.editedBox.id) return currentBox;
                return action.editedBox;
            });

            return { ...currentState, boxes };
        }

        case 'edit-service': {
            return { ...currentState, servicePopup: action.editedPopup };
        }

        case 'cancel-add-service': {
            return { ...currentState, servicePopup: { ...currentState.servicePopup, isHidden: true } };
        }

        case 'add-service': {
            return { ...currentState, servicePopup: { ...currentState.servicePopup, isHidden: false, boxId: action.boxId } };
        }

        case 'submit-service': {
            const boxes = currentState.boxes.map((currentbox) => {
                if (currentState.servicePopup.boxId !== currentbox.id) return currentbox;
                return { ...currentbox, services: [...currentbox.services, action.service] };
            });
            return { ...currentState, servicePopup: { ...currentState.servicePopup, isHidden: true }, boxes };
        }

        case 'connect-start-action': {
            return {
                ...currentState,
                connectionSetup: { ...currentState.connectionSetup, isActive: true, localPort: action.connectingPort, box1Id: action.connectingBox },
            };
        }

        case 'connect-cancel-action': {
            return { ...currentState, connectionSetup: { ...currentState.connectionSetup, isActive: false } };
        }

        case 'connect-final-action': {
            if (!currentState.connectionSetup.isActive) return currentState;

            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== currentState.connectionSetup.box1Id) return currentBox;
                return {
                    ...currentBox,
                    connections: [
                        ...currentBox.connections,
                        {
                            boxId: action.box2Id,
                            localPort: currentState.connectionSetup.localPort,
                            port: action.servicePort,
                        },
                    ],
                };
            });
            return { ...currentState, boxes, connectionSetup: { ...currentState.connectionSetup, isActive: false } };
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
