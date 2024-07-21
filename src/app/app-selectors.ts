import { useSelector } from 'react-redux'
import { AppRootState } from './store.ts'

export const selectAppStatus = (state: AppRootState) => state.app.status