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

    const boxComponents = boxes.map((BoxData, index) => <Box key={index} BoxData={BoxData} routes={routes} dispatch={dispatch} />);
    const routeComponents = routes.map((RouteData, index) => <Route key={index} RouteData={RouteData} />);

    return (
        <div style={AppStyle}>
            <Menu dispatch={dispatch} />
            {boxComponents}
            {routeComponents}
        </div>
    );
};
