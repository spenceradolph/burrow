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

export type AppAction = ClearSpaceAction | DeleteAction | SaveLocalAction | ClearLocalAction;
export type Dispatch = React.Dispatch<AppAction>;
