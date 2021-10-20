import { ChangeEvent, MouseEvent } from 'react';
import Xarrow from 'react-xarrows';
import { AppState, Dispatch } from '../state';

type TunnelProps = {
    tunnel: AppState['tunnels'][0];
};
export const Tunnel = (Props: TunnelProps) => {
    const { tunnel } = Props;

    return (
        <>
            <Xarrow
                arrowHeadProps={{ style: { visibility: 'hidden' } }}
                endAnchor={'middle'}
                start={`tunnelClient-${JSON.stringify(tunnel)}`}
                end={`tunnelHop-${JSON.stringify(tunnel)}}`}
            />
            <Xarrow startAnchor={'middle'} start={`tunnelHop-${JSON.stringify(tunnel)}}`} end={`service-${tunnel.targetServiceId}`} />
        </>
    );
};

type TunnelClientPointProps = {
    tunnel: AppState['tunnels'][0];
    dispatch: Dispatch;
};
export const TunnelClientPoint = (Props: TunnelClientPointProps) => {
    const { tunnel, dispatch } = Props;

    const changePort = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-client-port-tunnel', tunnelToEdit: { ...tunnel, clientPort: parseInt(event.currentTarget.value) } });
    };

    return (
        <div id={`tunnelClient-${JSON.stringify(tunnel)}`} style={{ position: 'relative', float: 'right' }}>
            <input type="number" value={tunnel.clientPort} style={{ width: '50px' }} onChange={changePort} />
        </div>
    );
};

type TunnelHopPointProps = {
    tunnel: AppState['tunnels'][0];
    dispatch: Dispatch;
    state: AppState;
};
export const TunnelHopPoint = (Props: TunnelHopPointProps) => {
    const { tunnel, state, dispatch } = Props;
    const deleteTunnel = (event: MouseEvent) => {
        event.stopPropagation();
        if (!state.metaData.serviceSetupIsActive && !state.metaData.connectionSetupIsActive && !state.metaData.tunnelSetupIsActive) {
            dispatch({ type: 'delete-tunnel', tunnel });
        }
    };

    const generateTunnelCommand = (event: MouseEvent) => {
        event.stopPropagation();
        const targetIP = state.boxes
            .filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.targetServiceId).pop()?.boxId)
            .pop()?.externalAddress;
        const targetPort = state.services.filter((thisService) => thisService.id === tunnel.targetServiceId).pop()?.port;
        const hopBoxIP = state.boxes
            .filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.hopServiceId).pop()?.boxId)
            .pop()?.externalAddress;

        const targetBoxId = state.boxes
            .filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.targetServiceId).pop()?.boxId)
            .pop()?.id;
        const hopBoxId = state.boxes.filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.hopServiceId).pop()?.boxId).pop()?.id;
        const isReverseTunnel = targetBoxId! < hopBoxId!;
        alert(`ssh user@${hopBoxIP} -${isReverseTunnel ? 'R' : 'L'} ${tunnel.clientPort}:${targetIP}:${targetPort}`);
    };

    return (
        <>
            <p onClick={deleteTunnel} style={{ textAlign: 'center' }}>
                Service: {tunnel.hopServiceId}
            </p>
            <div id={`tunnelHop-${JSON.stringify(tunnel)}}`} style={{ textAlign: 'center' }} />
            <button style={{ marginLeft: '35%' }} onClick={generateTunnelCommand}>
                Generate
            </button>
        </>
    );
};
