import reducer, { initialState } from './reducer'
import * as t from './actionTypes'

xdescribe('News reducer', () => {
  it('NEWS_GET_REQUEST', () => {
    const action = {
      type: t.NEWS_GET_REQUEST
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  it('NEWS_GET_SUCCESS', () => {
    const stateBefore = {
      data: null,
      isLoading: true,
      errorMsg: null
    }
    const action = {
      type: t.NEWS_GET_SUCCESS,
      payload: [1, 2, 3]
    }
    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      data: action.payload
    })
  })

  it('NEWS_GET_FAILURE', () => {
    const initialState = {
      data: null,
      isLoading: true,
      errorMsg: null,
    }
    const action = {
      type: t.NEWS_GET_FAILURE,
      payload: {
        errorMsg: '500 server Error'
      }
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      errorMsg: action.payload.errorMsg,
      isLoading: false
    })
  })
})
