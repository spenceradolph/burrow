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
            const boxes = currentState.boxes
                .filter((currentBox) => {
                    return currentBox.id !== action.id;
                })
                .map((currentBox) => {
                    return {
                        ...currentBox,
                        connections: currentBox.connections.filter((connection) => {
                            return connection.box2Id !== action.id;
                        }),
                    };
                });
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
            return { ...currentState, boxes: [...currentState.boxes, action.box] };
        }

        case 'edit-box': {
            const { editedBox } = action;
            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== editedBox.id) return currentBox;
                return editedBox;
            });

            return { ...currentState, boxes };
        }

        case 'edit-service': {
            return { ...currentState, servicePopup: action.editedPopup };
        }

        case 'cancel-add-service': {
            return { ...currentState, servicePopup: { isActive: false, boxId: -1 } };
        }

        case 'add-service': {
            return { ...currentState, servicePopup: { isActive: true, boxId: action.boxId } };
        }

        case 'submit-service': {
            const { boxId } = currentState.servicePopup;
            const boxes = currentState.boxes.map((currentbox) => {
                if (currentbox.id !== boxId) return currentbox;
                return { ...currentbox, services: [...currentbox.services, action.service] };
            });

            return { ...currentState, boxes, servicePopup: { isActive: false, boxId: -1 } };
        }

        case 'connect-start-action': {
            return { ...currentState, connectionSetup: { isActive: true, box1Id: action.box1Id, localPort: action.localPort } };
        }

        case 'connect-cancel-action': {
            return { ...currentState, connectionSetup: { isActive: false, box1Id: -1, localPort: -1 } };
        }

        case 'connect-final-action': {
            if (!currentState.connectionSetup.isActive) return currentState;
            const newConnection: AppState['boxes'][0]['connections'][0] = {
                box2Id: action.box2Id,
                localPort: currentState.connectionSetup.localPort,
                port: action.servicePort,
            };
            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== currentState.connectionSetup.box1Id) return currentBox;
                return { ...currentBox, connections: [...currentBox.connections, newConnection] };
            });

            return { ...currentState, boxes, connectionSetup: { isActive: false, box1Id: -1, localPort: -1 } };
        }

        case 'connect-remove-action': {
            const boxes = currentState.boxes.map((currentBox) => {
                if (currentBox.id !== action.boxId) return currentBox;
                return {
                    ...currentBox,
                    connections: currentBox.connections.filter((connection) => {
                        return connection.box2Id !== action.connection.box2Id || connection.port !== action.connection.port || connection.localPort !== action.connection.localPort;
                    }),
                };
            });

            return { ...currentState, boxes };
        }

        case 'start-tunnel': {
            return { ...currentState, tunnelSetup: { ...currentState.tunnelSetup, isActive: true, stage: 0 } };
        }

        case 'cancel-tunnel': {
            return { ...currentState, tunnelSetup: { ...currentState.tunnelSetup, isActive: false, stage: -1 } };
        }

        case 'tunnel-stage-0': {
            return { ...currentState, tunnelSetup: { ...currentState.tunnelSetup, stage: 1, tunnel: { ...currentState.tunnelSetup.tunnel, clientId: action.box.id } } };
        }

        case 'tunnel-stage-2': {
            return {
                ...currentState,
                tunnelSetup: { ...currentState.tunnelSetup, stage: 2, tunnel: { ...currentState.tunnelSetup.tunnel, hopId: action.box.id, hopService: action.service } },
            };
        }

        case 'tunnel-stage-3': {
            return {
                ...currentState,
                tunnelSetup: { ...currentState.tunnelSetup, isActive: false },
                tunnels: [...currentState.tunnels, { ...currentState.tunnelSetup.tunnel, targetId: action.box.id, targetPort: action.service }],
            };
        }

        case 'delete-service-action': {
            const boxes = currentState.boxes
                .map((currentBox) => {
                    if (currentBox.id !== action.boxId) return currentBox;
                    return {
                        ...currentBox,
                        services: currentBox.services.filter((service) => {
                            return service.port !== action.servicePort;
                        }),
                    };
                })
                .map((currentBox) => {
                    return {
                        ...currentBox,
                        connections: currentBox.connections.filter((connection) => {
                            return connection.port !== action.servicePort || connection.box2Id !== action.boxId;
                        }),
                    };
                });
            const tunnels = currentState.tunnels.filter((tunnel) => {
                return (
                    (tunnel.hopId !== action.boxId || tunnel.hopService !== action.servicePort) && (tunnel.targetId !== action.boxId || tunnel.targetPort !== action.servicePort)
                );
            });
            return { ...currentState, boxes, tunnels };
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
