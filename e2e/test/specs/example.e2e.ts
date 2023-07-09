import homePage from '../pageobjects/home.page.js'

describe('Home Page', () => {
  it('#smoke - should render the home page', async () => {
    await homePage.open()

    await homePage.form.waitForDisplayed()
    await expect(homePage.title).toHaveText('Grocery Bud')
    await expect(homePage.input).toBePresent()
    await expect(homePage.addButton).toBePresent()
  })
})
