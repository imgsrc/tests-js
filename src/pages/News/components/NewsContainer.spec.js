import React from 'react'
import { shallow } from 'enzyme'
import { NewsContainer } from './NewsContainer'

describe('News container', () => {
  const props = {
    news: {
      data: [],
      isLoading: false,
      errorMsg: null
    },
    onGetNews: () => {
    }
  }

  describe('News container initial', () => {
    const mockGetNews = jest.fn()
    const nextProps = {
      ...props,
      onGetNews: mockGetNews
    }
    const newsContainer = shallow(<NewsContainer { ...nextProps } />)

    it('renders properly', () => {
      expect(newsContainer).toMatchSnapshot()
    })

    it('dispatches the `onGetNews()` method it receives from props', () => {
      expect(mockGetNews).toHaveBeenCalledTimes(1)
    })
  })

  describe('News container isLoading', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        isLoading: true
      }
    }

    const newsContainer = shallow(<NewsContainer { ...nextProps }/>)
    // console.log(newsContainer.debug())
    expect(newsContainer.find('p').text()).toEqual('Loading...')
  })

  describe('News container render <NewsList />', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        data: [1]
      }
    }
    const newsContainer = shallow(<NewsContainer { ...nextProps }/>)

    it('render <NewsList /> template', () => {
      expect(newsContainer.find('NewsList')).toHaveLength(1)
    })
  })

  describe('News container with errorMsg', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        errorMsg: 'Something going wrong'
      }
    }

    const newsContainer = shallow(<NewsContainer { ...nextProps } />)

    it('renders properly', () => {
      expect(newsContainer).toMatchSnapshot()
    })

    it('renders errorMsg', () => {
      expect(newsContainer.find('p').text()).toEqual(nextProps.news.errorMsg)
    })
  })
})
