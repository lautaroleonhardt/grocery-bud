import Page from './page.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  public get form() {
    return $('form')
  }

  public get title() {
    return this.form.$('h4=grocery bud')
  }

  public get input() {
    return this.form.$('input')
  }

  public get addButton() {
    return this.form.$('button')
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open()
  }
}

export default new HomePage()
