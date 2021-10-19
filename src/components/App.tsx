import { Properties } from 'csstype';
import { useReducer } from 'react';
import Xarrow from 'react-xarrows';
import { Box, Menu, Popup } from '../components';
import { initialState, reducer } from '../state';

const AppStyle: Properties = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'grey',
};

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div style={AppStyle}>
            <Menu state={state} dispatch={dispatch} />
            <Popup servicePopup={state.servicePopup} dispatch={dispatch} />
            {state.boxes.map((BoxData, index) => (
                <Box key={index} BoxData={BoxData} dispatch={dispatch} state={state} />
            ))}
            {state.tunnels.map((tunnel, index) => {
                return (
                    <>
                        <Xarrow
                            arrowHeadProps={{ style: { visibility: 'hidden' } }}
                            endAnchor={'middle'}
                            start={`tunnelClient-${JSON.stringify(tunnel)}`}
                            end={`tunnelHop-${JSON.stringify(tunnel)}}`}
                        />
                        <Xarrow startAnchor={'middle'} start={`tunnelHop-${JSON.stringify(tunnel)}}`} end={`box${tunnel.targetId}serviceport${tunnel.targetPort}`} />
                    </>
                );
            })}
        </div>
    );
};
