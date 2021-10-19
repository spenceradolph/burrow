import { Properties } from 'csstype';
import { useReducer } from 'react';
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
        </div>
    );
};
