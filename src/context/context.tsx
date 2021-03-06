import { FC, createContext, useContext, useReducer } from 'react';

type State = {
  group: number;
  limit: number;
  spread: number;
};

type ActionType =
  | {
      type: 'change';
      spread: number;
    }
  | { type: 'changeLimit'; limit: number };

type Dispatch = (action: ActionType) => void;

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<Dispatch | undefined>(undefined);

const stateReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'change':
      return { ...state, spread: action.spread };
    case 'changeLimit':
      return { ...state, limit: Math.min(Math.max(action.limit, 10), 100) };
    default:
      return state;
  }
};

const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    spread: 0,
    group: 0.5,
    limit: 20,
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
