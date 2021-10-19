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
            const serviceIdsToDelete = currentState.services.filter((thisService) => thisService.boxId === id).map((thisService) => thisService.id);
            const connectionIdsToDelete = currentState.connections.filter((thisConn) => serviceIdsToDelete.includes(thisConn.box2ServiceId)).map((thisConn) => thisConn.id);
            const tunnelIdsToDelete = currentState.tunnels
                .filter((thisTunn) => {
                    return serviceIdsToDelete.includes(thisTunn.hopServiceId) || serviceIdsToDelete.includes(thisTunn.targetServiceId);
                })
                .map((thisTunn) => thisTunn.id);

            const boxes = currentState.boxes.filter((thisBox) => thisBox.id !== id);
            const services = currentState.services.filter((thisService) => !serviceIdsToDelete.includes(thisService.id));
            const connections = currentState.connections.filter((thisConn) => !connectionIdsToDelete.includes(thisConn.id));
            const tunnels = currentState.tunnels.filter((thisTunn) => !tunnelIdsToDelete.includes(thisTunn.id));
            return { ...currentState, boxes, services, connections, tunnels };
        }

        case 'edit-box': {
            const { boxToEdit } = action;
            const boxes = currentState.boxes.map((thisBox) => (thisBox.id !== boxToEdit.id ? thisBox : boxToEdit));
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
            const services = currentState.services.filter((thisService) => thisService !== serviceToDelete);
            const connections = currentState.connections.filter((thisConn) => thisConn.box2ServiceId !== serviceToDelete.id);
            const tunnels = currentState.tunnels.filter((thisTunn) => thisTunn.hopServiceId !== serviceToDelete.id && thisTunn.targetServiceId !== serviceToDelete.id);
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
                        box1Port: 1337, // TODO: change this to handle ephemeral ports
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
                box2ServiceId: action.serviceToConnect.id,
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
            const connections = currentState.connections.filter((thisConn) => thisConn !== action.connectionToRemove);
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
                        hopServiceId: action.hopService.id,
                    },
                },
            };
        }

        case 'tunnel-stage-2': {
            const newTunnel: AppState['tunnels'][0] = {
                ...currentState.metaData.newTunnel,
                targetServiceId: action.targetService.id,
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

        case 'edit-client-port-tunnel': {
            const { clientId } = action.tunnelToEdit;
            const tunnels = currentState.tunnels.map((thisTunn) => {
                if (thisTunn.clientId !== clientId) return thisTunn;
                return action.tunnelToEdit;
            });
            return { ...currentState, tunnels };
        }

        case 'delete-tunnel': {
            const tunnels = currentState.tunnels.filter((thisTunn) => action.tunnel !== thisTunn);
            return { ...currentState, tunnels };
        }

        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
        }
    }
};
