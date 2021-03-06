import { FC, createContext, useContext, useReducer } from 'react';

const getStep = (x: number) => {
  switch (x) {
    case 1:
      return 0.5;
    case 2:
      return 1;
    case 3:
      return 2.5;
    case 4:
      return 5;
    case 5:
      return 10;
    case 6:
      return 25;
    case 7:
      return 50;
    case 8:
      return 100;
    case 9:
      return 250;
    case 10:
      return 500;
    case 11:
      return 1000;
    case 12:
      return 2500;
    default:
      return 0.5;
  }
};

type State = {
  group: number;
  groupStep: number;
  limit: number;
  spread: number;
};

type ActionType =
  | {
      type: 'change';
      spread: number;
    }
  | { type: 'changeLimit'; limit: number }
  | { type: 'changeGroup'; group: number };

type Dispatch = (action: ActionType) => void;

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<Dispatch | undefined>(undefined);

const stateReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'change':
      return { ...state, spread: action.spread };
    case 'changeLimit':
      return { ...state, limit: Math.min(Math.max(action.limit, 10), 100) };
    case 'changeGroup': {
      const group = Math.min(Math.max(action.group, 1), 12);
      return {
        ...state,
        group,
        groupStep: getStep(group),
      };
    }
    default:
      return state;
  }
};

const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    spread: 0,
    group: 1,
    groupStep: getStep(1),
    limit: 15,
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

const useContextState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useContextState must be used within a ContextProvider');
  }
  return context;
};

const useContextDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useContextDispatch must be used within a ContextProvider');
  }
  return context;
};

export { ContextProvider, useContextState, useContextDispatch };
