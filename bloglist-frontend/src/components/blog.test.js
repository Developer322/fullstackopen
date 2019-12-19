import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from './BlogContainer.js'

test('renders content', () => {
  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:3
  }

  const component = render(
    <Blog blog={blog} username='testusername' />
  )

  const element = component.getByText('test title test author')
  expect(element).toBeDefined()
  expect(component.container).not.toHaveTextContent('added by test author')
  expect(component.container).not.toHaveTextContent('test url')
  expect(component.container).not.toHaveTextContent('3 likes')
  expect(component.container).not.toHaveTextContent('remove')
})

test('clicking the title shows details', () => {
    const blog = {
        title:'test title',
        author:'test author',
        url:'test url',
        user:{
            username:'testusername',
            name:'qwe'
        },
        likes:3
      }
  
    const component = render(
        <Blog blog={blog} username='testusername' />
    )
  
    const title = component.getByText('test title test author')
    fireEvent.click(title)
  
    const toggledTitle = component.getByText('test title')
    expect(toggledTitle).toBeDefined()

    const toggledAuthor = component.getByText('added by test author')
    expect(toggledAuthor).toBeDefined()
        
    const toggledUrl = component.getByText('test url')
    expect(toggledUrl).toBeDefined()

    const toggledLikes = component.getByText('3 likes')
    expect(toggledLikes).toBeDefined()

    const toggledLikeButton = component.getByText('remove')
    expect(toggledLikeButton).toBeDefined()
  })