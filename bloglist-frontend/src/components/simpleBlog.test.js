import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog.js'

test('renders content', () => {
  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const info = component.container.querySelector('.infoBlock')
  expect(info).toHaveTextContent('test title test author')

  const likes = component.container.querySelector('.likeBlock')
  expect(likes).toHaveTextContent('blog has 3 likes')
})

test('double clicking the button calls event handler twice', () => {
    const blog = {
        title:'test title',
        author:'test author',
        url:'test url',
        likes:3
      }

    const mockHandler = jest.fn()
  
    const component = render(
        <SimpleBlog blog={blog} onClick={ mockHandler }/>
    )
  
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })