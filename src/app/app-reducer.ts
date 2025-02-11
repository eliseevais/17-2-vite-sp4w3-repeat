export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    default:
      return state
  }
}

// ACTIONS
export const setAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}

// TYPES
type ActionsType = setAppStatusActionType;

type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
