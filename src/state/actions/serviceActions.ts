import { BaseAction } from '../actions';
import { AppState } from '../state';

/**
 * Clicked 'Add Service' button on a box, start the popup.
 */
type StartAddServiceAction = BaseAction & {
    type: 'start-add-service';
    boxToAddService: AppState['boxes'][0];
};

/**
 * Closed the popup before submitting.
 */
type CancelAddServiceAction = BaseAction & {
    type: 'cancel-add-service';
};

/**
 * Done with service popup, submit to the state.
 */
type AddServiceAction = BaseAction & {
    type: 'add-service';
    serviceToAdd: AppState['services'][0];
};

/**
 * Delete the service.
 */
type DeleteServiceAction = BaseAction & {
    type: 'delete-service';
    serviceToDelete: AppState['services'][0];
};

export type AllServiceActions = StartAddServiceAction | CancelAddServiceAction | AddServiceAction | DeleteServiceAction;
