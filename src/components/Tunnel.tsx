import { MouseEvent } from 'react';
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
            <Xarrow startAnchor={'middle'} start={`tunnelHop-${JSON.stringify(tunnel)}}`} end={`service-${tunnel.targetId}-${tunnel.targetPort}`} />
        </>
    );
};

type TunnelClientPointProps = {
    tunnel: AppState['tunnels'][0];
};
export const TunnelClientPoint = (Props: TunnelClientPointProps) => {
    const { tunnel } = Props;
    return (
        <div id={`tunnelClient-${JSON.stringify(tunnel)}`} style={{ position: 'relative', float: 'right' }}>
            <input type="number" value="2222" style={{ width: '50px' }} />
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

    return (
        <>
            <p onClick={deleteTunnel} style={{ textAlign: 'center' }}>
                Service: {tunnel.hopPort}
            </p>
            <div id={`tunnelHop-${JSON.stringify(tunnel)}}`} style={{ textAlign: 'center' }} />
        </>
    );
};
