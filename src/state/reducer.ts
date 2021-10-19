import { AllActions } from './actions';
import { defaultEmptyApp } from './exampleData';
import { AppState, LOCAL_STORAGE_ID } from './state';

/**
 * A Reducer is a function that takes the current state and an action, and returns a new state (based on the type of action provided).
 */
export const reducer = (currentState: AppState, action: AllActions): AppState => {
    switch (action.type) {
        case 'delete-all-objects': {
            return defaultEmptyApp;
        }

        case 'save-localstorage': {
            localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(currentState));
            return currentState;
        }

        case 'delete-localstorage': {
            localStorage.removeItem(LOCAL_STORAGE_ID);
            return currentState;
        }

        case 'add-box': {
            return { ...currentState, boxes: [...currentState.boxes, action.boxToAdd] };
        }

        case 'delete-box': {
            const { id } = action.boxToDelete;
            const boxes = currentState.boxes.filter((thisBox) => {
                return thisBox.id !== id;
            });
            const services = currentState.services.filter((thisService) => {
                return thisService.boxId !== id;
            });
            const connections = currentState.connections.filter((thisConn) => {
                return thisConn.box1Id !== id || thisConn.box2Id !== id;
            });
            const tunnels = currentState.tunnels.filter((thisTunn) => {
                return thisTunn.clientId !== id || thisTunn.hopId !== id || thisTunn.targetId !== id;
            });
            return { ...currentState, boxes, services, connections, tunnels };
        }

        case 'edit-box': {
            const { boxToEdit } = action;
            const boxes = currentState.boxes.map((thisbox) => {
                if (thisbox.id !== boxToEdit.id) return thisbox;
                return boxToEdit;
            });
            return { ...currentState, boxes };
        }

        case 'start-add-service': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    serviceSetupIsActive: true,
                    newService: {
                        ...defaultEmptyApp.metaData.newService,
                        boxId: action.boxToAddService.id,
                    },
                },
            };
        }

        case 'cancel-add-service': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    serviceSetupIsActive: false,
                    newService: defaultEmptyApp.metaData.newService,
                },
            };
        }

        case 'add-service': {
            return {
                ...currentState,
                services: [...currentState.services, action.serviceToAdd],
                metaData: {
                    ...currentState.metaData,
                    serviceSetupIsActive: false,
                    newService: defaultEmptyApp.metaData.newService,
                },
            };
        }

        case 'delete-service': {
            const { serviceToDelete } = action;
            const services = currentState.services.filter((thisService) => {
                return thisService.boxId !== serviceToDelete.boxId || thisService.port !== serviceToDelete.port;
            });
            const connections = currentState.connections.filter((thisConn) => {
                return thisConn.box2Id !== serviceToDelete.boxId || thisConn.box2Port !== serviceToDelete.port;
            });
            const tunnels = currentState.tunnels.filter((thisTunn) => {
                return (
                    thisTunn.hopId !== serviceToDelete.boxId ||
                    thisTunn.hopPort !== serviceToDelete.port ||
                    thisTunn.targetId !== serviceToDelete.boxId ||
                    thisTunn.targetPort !== serviceToDelete.port
                );
            });
            return { ...currentState, services, connections, tunnels };
        }

        case 'start-add-connection': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    connectionSetupIsActive: true,
                    newConnection: {
                        ...defaultEmptyApp.metaData.newConnection,
                        box1Id: action.box1.id,
                        box1Port: 9876, // TODO: change this to handle ephemeral ports
                    },
                },
            };
        }

        case 'cancel-add-connection': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    connectionSetupIsActive: false,
                    newConnection: defaultEmptyApp.metaData.newConnection,
                },
            };
        }

        case 'add-connection': {
            const newConnection: AppState['connections'][0] = {
                ...currentState.metaData.newConnection,
                box2Id: action.serviceToConnect.boxId,
                box2Port: action.serviceToConnect.port,
            };
            return {
                ...currentState,
                connections: [...currentState.connections, newConnection],
                metaData: {
                    ...currentState.metaData,
                    connectionSetupIsActive: false,
                    newConnection: defaultEmptyApp.metaData.newConnection,
                },
            };
        }

        case 'delete-connection': {
            const { connectionToRemove } = action;
            const connections = currentState.connections.filter((thisConn) => {
                return (
                    thisConn.box1Id !== connectionToRemove.box1Id ||
                    thisConn.box1Port !== connectionToRemove.box1Port ||
                    thisConn.box2Id !== connectionToRemove.box2Id ||
                    thisConn.box2Port !== connectionToRemove.box2Port
                );
            });
            return { ...currentState, connections };
        }

        case 'start-tunnel': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    tunnelSetupIsActive: true,
                    newTunnel: defaultEmptyApp.metaData.newTunnel,
                },
            };
        }

        case 'cancel-tunnel': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    tunnelSetupIsActive: false,
                    newTunnel: defaultEmptyApp.metaData.newTunnel,
                },
            };
        }

        case 'tunnel-stage-0': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    newTunnel: {
                        ...defaultEmptyApp.metaData.newTunnel,
                        clientId: action.clientBox.id,
                        clientPort: 2222, // TODO: default listening port for tunnels?
                    },
                },
            };
        }

        case 'tunnel-stage-1': {
            return {
                ...currentState,
                metaData: {
                    ...currentState.metaData,
                    newTunnel: {
                        ...currentState.metaData.newTunnel,
                        hopId: action.hopService.boxId,
                        hopPort: action.hopService.port,
                    },
                },
            };
        }

        case 'tunnel-stage-2': {
            const newTunnel: AppState['tunnels'][0] = {
                ...currentState.metaData.newTunnel,
                targetId: action.targetService.boxId,
                targetPort: action.targetService.port,
            };
            return {
                ...currentState,
                tunnels: [...currentState.tunnels, newTunnel],
                metaData: {
                    ...currentState.metaData,
                    tunnelSetupIsActive: false,
                    newTunnel: defaultEmptyApp.metaData.newTunnel,
                },
            };
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
