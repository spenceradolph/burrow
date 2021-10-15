import { Properties } from 'csstype';
import { Menu, Box, BoxType} from './components';

const AppStyle: Properties = {
  height: "100vh", // App should cover entire web-page
  width: "100vw",
  backgroundColor: "grey"
}

// TODO: top-level state management -> allow changes to state and have it update components...
const exampleData: BoxType[] = [
  {name: 'Box1', internalAddress: '1.0.0.1', externalAddress: '2.0.0.1'},
  {name: 'Box2', internalAddress: '1.0.0.2', externalAddress: '2.0.0.2'},
  {name: 'Box3', internalAddress: '1.0.0.3', externalAddress: '2.0.0.3'},
]

/**
 * Top Level Component for entire react project.
 */
export const App = () => {
  const exampleBoxes = exampleData.map((BoxData, index) => {
    return <Box key={index} name={BoxData.name} internalAddress={BoxData.internalAddress} externalAddress={BoxData.externalAddress}  />
  })

  return (
    <div style={AppStyle}>
      <Menu />
      {exampleBoxes} 
    </div>
  );
}
