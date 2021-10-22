import { BaseAction } from '../actions';
import { AppState } from '../state';

/**
 * Clicked 'Add Service' button on a box, start the popup.
 */
type StartAddPivotAction = BaseAction & {
    type: 'start-add-pivot';
    boxToAddPivot: AppState['boxes'][0];
};

/**
 * Closed the popup before submitting.
 */
type CancelAddPivotAction = BaseAction & {
    type: 'cancel-add-pivot';
};

/**
 * Done with service popup, submit to the state.
 */
type AddPivotAction = BaseAction & {
    type: 'add-pivot';
    pivotToAdd: AppState['pivots'][0];
    serviceToAdd: AppState['services'][0];
};

/**
 * Delete the service.
 */
type DeletePivotAction = BaseAction & {
    type: 'delete-pivot';
    pivotToDelete: AppState['pivots'][0];
};

/**
 * Edit the listening/exposed port on the client side of the tunnel.
 */
type EditPivotPortAction = BaseAction & {
    type: 'edit-hop-port-pivot';
    pivotToEdit: AppState['pivots'][0];
};

export type AllPivotActions = StartAddPivotAction | CancelAddPivotAction | AddPivotAction | EditPivotPortAction | DeletePivotAction;
