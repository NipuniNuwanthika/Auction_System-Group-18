import { browser, by, element } from 'protractor';      //importing browser, by, element from protractor
// browser, is for interacting with browser
// by, is for finding the element by css or any other function
// element, is for converting the selected element    

export class Pk2ProAngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();    //finding an element with the selector 'app-root h1'
  }
}
