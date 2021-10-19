import { AppState } from '../state';
import { BaseAction } from './';

/**
 * Clicked 'connect' button on a box, next step will be clicking another box's service.
 */
type StartAddConnectionAction = BaseAction & {
    type: 'start-add-connection';
    box1: AppState['boxes'][0];
};

/**
 * Cancel creating a connection.
 */
type CancelAddConnectionAction = BaseAction & {
    type: 'cancel-add-connection';
};

/**
 * 2nd/final step in connecting, clicked a service on a different box.
 */
type AddConnectionAction = BaseAction & {
    type: 'add-connection';
    serviceToConnect: AppState['services'][0];
};

/**
 * Delete the connection.
 */
type DeleteConnectionAction = BaseAction & {
    type: 'delete-connection';
    connectionToRemove: AppState['connections'][0];
};

export type AllConnectionActions = StartAddConnectionAction | CancelAddConnectionAction | AddConnectionAction | DeleteConnectionAction;
