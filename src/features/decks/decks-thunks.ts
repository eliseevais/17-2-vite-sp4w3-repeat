import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import {
  addDeckAC,
  deleteDeckAC,
  setDecksAC,
  updateDeckAC,
} from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    console.warn(error)
    dispatch(setAppStatusAC('failed'))
  }
  dispatch(setAppStatusAC('idle'))
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

// case 1 - error on backend (console.log / network or log /
// axiosError.response.data.errorMessage[0].message

// case 2 - error on client side (console.log / network or log /
// // axiosError.message

// case 3 - error in code (поле e.message)

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    let errorMessage: string

    if (isAxiosError<ServerErrorMessageType>(e)) {
      errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
    } else {
      errorMessage = (e as Error).message
    }
    console.log(errorMessage)
  }
}

type ServerErrorMessageType = {
  errorMessages: Array<{field: string,message: string}>
}

