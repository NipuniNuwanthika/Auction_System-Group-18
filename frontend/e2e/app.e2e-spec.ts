import { Pk2ProAngularPage } from './app.po';

describe('pk2-pro-angular App', () => {
  let page: Pk2ProAngularPage;  //declaring an object


  beforeEach(() => {
    page = new Pk2ProAngularPage();  //initialize the object with Pk2ProAngularPage instance
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');  //confirming that the title is 'Welcome to app' by getting the value from our page object by calling page.getParagraphText()
  });
});
