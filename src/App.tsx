import { Properties } from 'csstype';
import { useReducer } from 'react';
import { Menu, Box, Route } from './components';
import { exampleBoxList, exampleRouteList } from './ExampleData';
import { AppState, StateReducer } from './StateManagement';

const AppStyle: Properties = {
    height: '100vh', // App should cover entire web-page
    width: '100vw',
    backgroundColor: 'grey',
};

/**
 * Top Level Component for entire web-app.
 */
export const App = () => {
    // State Management Setup
    const locallyStoredState = localStorage.getItem('tunnel-tool-state');
    const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : { boxes: exampleBoxList, routes: exampleRouteList };
    const [state, dispatch] = useReducer(StateReducer, initialState);

    // Create components from state
    const { boxes, routes } = state;

    const exampleBoxes = boxes.map((BoxData, index) => {
        return <Box key={index} BoxData={BoxData} dispatch={dispatch} />;
    });

    const exampleRoutes = routes.map((RouteData, index) => {
        return <Route key={index} RouteData={RouteData} />;
    });

    // Return final HTML (JSX)
    return (
        <div style={AppStyle}>
            <Menu state={state} />
            {exampleBoxes}
            {exampleRoutes}
        </div>
    );
};
