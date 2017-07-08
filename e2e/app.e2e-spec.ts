import { BattleshipAppPage } from './app.po';

describe('battleship-app App', () => {
  let page: BattleshipAppPage;

  beforeEach(() => {
    page = new BattleshipAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
