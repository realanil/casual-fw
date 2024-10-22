// lib/reducer.ts
export type State<Data> = {
    data: Data | null;
    loading: boolean;
    error: string | null;
  };
  
  export type Action<Data> =
    | { type: 'POST_INIT' }
    | { type: 'POST_SUCCESS'; payload: Data }
    | { type: 'POST_FAILURE'; payload: string };
  
  export const initialState: State<any> = {
    data: null,
    loading: false,
    error: null,
  };
  
  export const reducer = <Data>(state: State<Data>, action: Action<Data>): State<Data> => {
    switch (action.type) {
      case 'POST_INIT':
        return { ...state, loading: true, error: null };
      case 'POST_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'POST_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  