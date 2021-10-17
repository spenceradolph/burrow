import { Properties } from 'csstype';
import { useReducer } from 'react';
import { Box, Menu, Route } from '../components';
import { initialState, reducer } from '../state';

const AppStyle: Properties = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'grey',
};

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { boxes, routes } = state;

    const exampleBoxes = boxes.map((BoxData, index) => {
        return <Box key={index} BoxData={BoxData} dispatch={dispatch} />;
    });

    const exampleRoutes = routes.map((RouteData, index) => {
        return <Route key={index} RouteData={RouteData} />;
    });

    return (
        <div style={AppStyle}>
            <Menu state={state} dispatch={dispatch} />
            {exampleBoxes}
            {exampleRoutes}
        </div>
    );
};
