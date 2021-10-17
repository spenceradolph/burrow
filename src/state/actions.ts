import React from 'react';
import { AppState } from './state';

type BaseAction = {
    type: string;
    payload: any;
};

export type ClearSpaceAction = BaseAction & {
    type: 'clear-app';
};

export type DeleteAction = BaseAction & {
    type: 'delete';
    payload: {
        id: AppState['boxes'][0]['id'];
    };
};

export type SaveLocalAction = BaseAction & {
    type: 'save-local';
};

export type ClearLocalAction = BaseAction & {
    type: 'clear-local';
};

export type AppAction = ClearSpaceAction | DeleteAction | SaveLocalAction | ClearLocalAction;
export type Dispatch = React.Dispatch<AppAction>;
