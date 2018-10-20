import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { API_ROOT } from '../../constants/Defaults'

import { newsRequest, getNews, newsSuccess } from './actions'
import * as t from './actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

xdescribe('News Actions', () => {
  it('newsRequest', () => {
    expect(newsRequest()).toEqual({
      type: t.NEWS_GET_REQUEST
    })
  })
})

xdescribe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates NEWS_GET_SUCCESS when fetching news has been done', () => {
    fetchMock.getOnce(`${API_ROOT}/news`, {
      headers: { 'content-type': 'application/json' },
      body: { data: [1, 2, 3], status: 'ok' }
    })

    const expectedActions = [newsRequest(), newsSuccess([1, 2, 3])]
    const store = mockStore({})

    return store.dispatch(getNews())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})