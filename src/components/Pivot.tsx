import { ChangeEvent, MouseEvent } from 'react';
import Xarrow from 'react-xarrows';
import { AppState, Dispatch } from '../state';

type PivotProps = {
    pivot: AppState['pivots'][0];
    state: AppState;
    dispatch: Dispatch;
};
export const Pivot = (Props: PivotProps) => {
    const { pivot, dispatch, state } = Props;

    const changePort = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: 'edit-hop-port-pivot', pivotToEdit: { ...pivot, hopPort: parseInt(event.currentTarget.value) } });
    };

    const generatePivotCommand = (event: MouseEvent) => {
        event.stopPropagation();
        const targetIP = state.boxes
            .filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === pivot.targetService).pop()?.boxId)
            .pop()?.externalAddress;
        const targetPort = state.services.filter((thisService) => thisService.id === pivot.targetService).pop()?.port;
        const hopPort = pivot.hopPort;
        alert(`mknod fifo p; nc -l -v ${hopPort} 0<fifo | nc ${targetIP} ${targetPort} 1>fifo`);
    };

    const deletePivot = (event: MouseEvent) => {
        event.stopPropagation();
        if (!state.metaData.connectionSetupIsActive && !state.metaData.tunnelSetupIsActive && !state.metaData.serviceSetupIsActive && !state.metaData.pivotSetupIsActive) {
            dispatch({ type: 'delete-pivot', pivotToDelete: pivot });
        }
    };

    return (
        <>
            <div id={`pivot-${JSON.stringify(pivot)}`} style={{ position: 'relative', float: 'right' }}>
                <input type="number" value={pivot.hopPort} style={{ width: '50px' }} onChange={changePort} />
                <div onClick={deletePivot}>Pivot</div>
            </div>
            <Xarrow start={`pivot-${JSON.stringify(pivot)}`} end={`service-${pivot.targetService}`} />
            <button onClick={generatePivotCommand} style={{ float: 'right', position: 'relative' }}>
                Gen
            </button>
        </>
    );
};
