import { AllBoxActions } from './boxActions';
import { AllServiceActions } from './serviceActions';
import { AllConnectionActions } from './connectionActions';
import { AllTunnelActions } from './tunnelActions';
import { AllMiscActions } from './miscActions';
import { AllPivotActions } from './pivotActions';

/**
 * Every action requires a type for the reducer to switch on.
 */
export type BaseAction = {
    type: string;
};

export type AllActions = AllBoxActions | AllServiceActions | AllConnectionActions | AllTunnelActions | AllMiscActions | AllPivotActions;
export type Dispatch = React.Dispatch<AllActions>;
