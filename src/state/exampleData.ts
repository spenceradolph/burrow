import { AppState } from './state';

// TODO: remove from final release

const exampleBoxList: AppState['boxes'] = [
    { id: 1, name: 'CHANGEME', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1', services: [], connections: [] }
];

export const exampleInitialState: AppState = {
    boxes: exampleBoxList,
    servicePopup: {
        isHidden: true,
        name: 'ServiceName',
        port: 0,
        boxId: -1
    }
};
