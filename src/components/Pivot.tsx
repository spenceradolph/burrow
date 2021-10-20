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

        // const targetBoxId = state.boxes
        //     .filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.targetServiceId).pop()?.boxId)
        //     .pop()?.id;
        // const hopBoxId = state.boxes.filter((thisBox) => thisBox.id === state.services.filter((thisService) => thisService.id === tunnel.hopServiceId).pop()?.boxId).pop()?.id;
        // const isReverseTunnel = targetBoxId! < hopBoxId!;

        alert(`mknod fifo p; nc -l -v ${hopPort} 0<fifo | nc ${targetIP} ${targetPort} 1>fifo`);
    };

    return (
        <>
            <div id={`pivot-${JSON.stringify(pivot)}`} style={{ position: 'relative', float: 'right' }}>
                <input type="number" value={pivot.hopPort} style={{ width: '50px' }} onChange={changePort} />
                Pivot
            </div>
            <Xarrow start={`pivot-${JSON.stringify(pivot)}`} end={`service-${pivot.targetService}`} />
            <button onClick={generatePivotCommand} style={{ float: 'right', position: 'relative' }}>
                Gen
            </button>
        </>
    );
};
