import Xarrow from 'react-xarrows';
import { AppState } from '../state';

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
