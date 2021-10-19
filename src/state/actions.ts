import React from 'react';
import { AppState } from './state';

type BaseAction = {
    type: string;
};

type ClearSpaceAction = BaseAction & {
    type: 'clear-app';
};

type DeleteAction = BaseAction & {
    type: 'delete';
    id: AppState['boxes'][0]['id'];
};

type SaveLocalAction = BaseAction & {
    type: 'save-local';
};

type ClearLocalAction = BaseAction & {
    type: 'clear-local';
};

type AddBoxAction = BaseAction & {
    type: 'add-box';
    box: AppState['boxes'][0];
};

type EditBoxAction = BaseAction & {
    type: 'edit-box';
    editedBox: AppState['boxes'][0];
};

type AddServiceAction = BaseAction & {
    type: 'add-service';
    boxId: AppState['boxes'][0]['id'];
};

type SubmitServiceAction = BaseAction & {
    type: 'submit-service';
    service: AppState['boxes'][0]['services'][0];
};

type CancelAddServiceAction = BaseAction & {
    type: 'cancel-add-service';
};

type EditServiceAction = BaseAction & {
    type: 'edit-service';
    editedPopup: AppState['servicePopup'];
};

type ConnectStartAction = BaseAction & {
    type: 'connect-start-action';
    box1Id: AppState['boxes'][0]['id'];
    localPort: number;
};

type ConnectFinalAction = BaseAction & {
    type: 'connect-final-action';
    box2Id: AppState['boxes'][0]['id'];
    servicePort: number;
};

type ConnectCancelAction = BaseAction & {
    type: 'connect-cancel-action';
};

type RemoveConnectionAction = BaseAction & {
    type: 'connect-remove-action';
    boxId: AppState['boxes'][0]['id'];
    connection: AppState['boxes'][0]['connections'][0];
};

type DeleteServiceAction = BaseAction & {
    type: 'delete-service-action';
    boxId: AppState['boxes'][0]['id'];
    servicePort: AppState['boxes'][0]['services'][0]['port'];
};

type StartTunnelSelectionAction = BaseAction & {
    type: 'start-tunnel';
};
type CancelTunnelSelectionAction = BaseAction & {
    type: 'cancel-tunnel';
};

type Stage1TunnelAction = BaseAction & {
    type: 'tunnel-stage-1';
    box: AppState['boxes'][0];
};

type Stage2TunnelAction = BaseAction & {
    type: 'tunnel-stage-2';
    box: AppState['boxes'][0];
    service: AppState['boxes'][0]['services'][0]['port'];
};

type Stage3TunnelAction = BaseAction & {
    type: 'tunnel-stage-3';
    box: AppState['boxes'][0];
    service: AppState['boxes'][0]['services'][0]['port'];
};

export type AppAction =
    | ClearSpaceAction
    | DeleteAction
    | SaveLocalAction
    | ClearLocalAction
    | AddBoxAction
    | EditBoxAction
    | EditServiceAction
    | CancelAddServiceAction
    | AddServiceAction
    | SubmitServiceAction
    | ConnectStartAction
    | ConnectCancelAction
    | ConnectFinalAction
    | RemoveConnectionAction
    | StartTunnelSelectionAction
    | CancelTunnelSelectionAction
    | Stage1TunnelAction
    | Stage2TunnelAction
    | Stage3TunnelAction
    | DeleteServiceAction;
export type Dispatch = React.Dispatch<AppAction>;
