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
    connectingBox: AppState['boxes'][0]['id'];
    connectingPort: number;
};

type ConnectFinalAction = BaseAction & {
    type: 'connect-final-action';
    box2Id: AppState['boxes'][0]['id'];
    servicePort: number;
};

type ConnectCancelAction = BaseAction & {
    type: 'connect-cancel-action';
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
    | ConnectFinalAction;
export type Dispatch = React.Dispatch<AppAction>;
