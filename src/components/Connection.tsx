import Xarrow from 'react-xarrows';
import { AppState } from '../state';

type ConnectionProps = {
    connection: AppState['connections'][0];
};

export const Connection = (Props: ConnectionProps) => {
    const { connection } = Props;
    const { box2Id, box2Port } = connection;

    return <Xarrow start={`connection-${JSON.stringify(connection)}`} end={`service-${box2Id}-${box2Port}`} />;
};
