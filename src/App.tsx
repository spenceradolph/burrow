import { Properties } from 'csstype';
import { useReducer } from 'react';
import { Menu, Box } from './components';
import { exampleBoxList, exampleRouteList } from './ExampleData';
import { AppState, StateReducer } from './StateManagement';

const AppStyle: Properties = {
  height: "100vh", // App should cover entire web-page
  width: "100vw",
  backgroundColor: "grey"
}

// TODO: remove example data in final product...
const initialState: AppState = {
  boxes: exampleBoxList,
  routes: exampleRouteList,
}

/**
 * Top Level Component for entire react project.
 */
export const App = () => {
  const [state, dispatch] = useReducer(StateReducer, initialState);

  const exampleBoxes = state.boxes.map((BoxData, index) => {
    return <Box key={index} BoxData={BoxData} dispatch={dispatch}  />
  })

  return (
    <div style={AppStyle}>
      <Menu />
      {exampleBoxes} 
    </div>
  );
}
