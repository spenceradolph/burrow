import { AppState } from '../state';
import { BaseAction } from './index';

/**
 * Create a default box in the workspace
 */
type AddBoxAction = BaseAction & {
    type: 'add-box';
    boxToAdd: AppState['boxes'][0];
};

/**
 * Delete a box (and things connected to it)
 */
type DeleteBoxAction = BaseAction & {
    type: 'delete-box';
    boxToDelete: AppState['boxes'][0];
};

/**
 * Some aspect of the box needs changing (name, ip's, notes...)
 */
type EditBoxAction = BaseAction & {
    type: 'edit-box';
    boxToEdit: AppState['boxes'][0];
};

export type AllBoxActions = AddBoxAction | DeleteBoxAction | EditBoxAction;
