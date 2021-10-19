import { BaseAction } from '../actions';
import { AppState } from '../state';

/**
 * Clicked menu button to create a tunnel.
 */
type StartTunnelSelectionAction = BaseAction & {
    type: 'start-tunnel';
};

/**
 * Cancelled the tunnel selection process.
 */
type CancelTunnelSelectionAction = BaseAction & {
    type: 'cancel-tunnel';
};

/**
 * Clicked the first (client) box for the tunnel.
 */
type Stage0TunnelAction = BaseAction & {
    type: 'tunnel-stage-0';
    clientBox: AppState['boxes'][0];
};

/**
 * Clicked the 2nd box (service) for the tunnel.
 */
type Stage1TunnelAction = BaseAction & {
    type: 'tunnel-stage-1';
    hopService: AppState['services'][0];
};

/**
 * Clicked the 3rd (final) box for the tunnel. (done with tunnel adding)
 */
type Stage2TunnelAction = BaseAction & {
    type: 'tunnel-stage-2';
    targetService: AppState['services'][0];
};

/**
 * Edit the listening/exposed port on the client side of the tunnel.
 */
type EditTunnelPortAction = BaseAction & {
    type: 'edit-client-port-tunnel';
    tunnelToEdit: AppState['tunnels'][0];
};

/**
 * Delete a tunnel by clicking the hop point.
 */
type DeleteTunnelAction = BaseAction & {
    type: 'delete-tunnel';
    tunnel: AppState['tunnels'][0];
};

export type AllTunnelActions =
    | StartTunnelSelectionAction
    | CancelTunnelSelectionAction
    | Stage0TunnelAction
    | Stage1TunnelAction
    | Stage2TunnelAction
    | DeleteTunnelAction
    | EditTunnelPortAction;
