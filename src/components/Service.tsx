import { AppState, defaultEmptyApp, Dispatch } from '../state';

type ServiceProps = {
    state: AppState;
    dispatch: Dispatch;
    service: AppState['services'][0];
};

export const Service = (Props: ServiceProps) => {
    const { service, state, dispatch } = Props;
    const { port, name } = service;

    const clickService = (event: any) => {
        event.stopPropagation();
        if (state.metaData.tunnelSetupIsActive) {
            if (
                state.metaData.newTunnel.clientId !== defaultEmptyApp.metaData.newTunnel.clientId &&
                state.metaData.newTunnel.hopServiceId === defaultEmptyApp.metaData.newTunnel.hopServiceId
            ) {
                dispatch({ type: 'tunnel-stage-1', hopService: service });
                return;
            }
            if (state.metaData.newTunnel.hopServiceId !== defaultEmptyApp.metaData.newTunnel.hopServiceId) {
                dispatch({ type: 'tunnel-stage-2', targetService: service });
                return;
            }
        }

        if (state.metaData.connectionSetupIsActive) {
            dispatch({ type: 'add-connection', serviceToConnect: service });
            return;
        }

        if (!state.metaData.connectionSetupIsActive && !state.metaData.tunnelSetupIsActive && !state.metaData.serviceSetupIsActive) {
            dispatch({ type: 'delete-service', serviceToDelete: service });
        }
    };

    // TODO: change how the id's are configured and try to only use JSON.stringify for the entire id if possible (connection component doesn't know the name of service tho...)
    return (
        <div id={`service-${service.id}`} data-service={JSON.stringify(service)} onClick={clickService}>
            {name}:{port}
        </div>
    );
};
