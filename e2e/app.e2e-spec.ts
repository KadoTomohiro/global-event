import { GlobalEventPage } from './app.po';

describe('global-event App', function() {
  let page: GlobalEventPage;

  beforeEach(() => {
    page = new GlobalEventPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
