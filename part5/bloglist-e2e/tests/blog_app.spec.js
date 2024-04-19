const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Johnny Boy',
          username: 'eggman',
          password: 'salainen'
        }
      })

    await page.goto('http://localhost:5173')
  })

  test('Login form is visible', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () =>{
    test('succeeds with correct credentials', async ({page}) =>{
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        // Wrong credentials
        await loginWith(page, 'banana', 'salainen')
        await expect(page.getByText('Wrong credentials')).toBeVisible()

      })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page,'Bananas today','Wow Girl','www.eee')
        await expect(page.getByText('Bananas todayWow Girl')).toBeVisible()
    })

    test('a blog can be edited', async({page}) =>{
        await createBlog(page,'Bananas today','Wow Girl','www.eee')
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Like this post!' }).click()
        await expect(page.getByText('1')).toBeVisible()
    })

    test('a blog can be deleted by the creator', async({page}) =>{
        await createBlog(page,'Bananas today','Wow Girl','www.eee')
        await page.getByRole('button', { name: 'View' }).click()
        await page.on('dialog', async dialog => dialog.accept())
        await page.getByRole('button', { name: 'Delete Post' }).click()
        await expect(page.getByText('Bananas todayWow Girl')).toHaveCount(0)
    })

    test('a blog cant be deleted by anyone', async({page}) =>{
        await createBlog(page,'Bananas today','Wow Girl','www.eee')
        await page.getByRole('button', { name: 'Log Out' }).click()
        await loginWith(page, 'eggman', 'salainen')
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByRole('button', { name: 'Delete Post' })).toHaveCount(0)
    })
  })
})