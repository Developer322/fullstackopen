import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App.js'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)

    await waitForElement( () => component.getByText('login') )

    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)

    const buttons = component.container.querySelectorAll('button')
    expect(buttons.length).toBe(1)

    expect(component.container).not.toHaveTextContent('test title')
    expect(component.container).not.toHaveTextContent('test title2')
    expect(component.container).not.toHaveTextContent('test title3')
  })

  test('if user logged in, blogs are rendered', async () => {

    const user = {
      username: 'testuser',
      token: '1231231214',
      name: 'Test User'
    }

    localStorage.setItem('blogsListUser', JSON.stringify(user))

    const component = render(<App />)

    await waitForElement( () => component.container.querySelector('.blogTile') )

    const blogs = component.container.querySelectorAll('.blogTile')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent('test title test author')
    expect(component.container).toHaveTextContent('test title2 test author2')
    expect(component.container).toHaveTextContent('test title3 test author3')
  })
})
