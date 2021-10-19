import { BaseAction } from './';

/**
 * Delete All Objects within the AppState
 */
type DeleteAllObjectsAction = BaseAction & {
    type: 'delete-all-objects';
};

/**
 * Save AppState to browser local-storage
 */
type SaveLocalAction = BaseAction & {
    type: 'save-localstorage';
};

/**
 * Empty browser local-storage
 */
type DeleteLocalAction = BaseAction & {
    type: 'delete-localstorage';
};

export type AllMiscActions = DeleteAllObjectsAction | SaveLocalAction | DeleteLocalAction;
