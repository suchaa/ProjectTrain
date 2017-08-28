import { ProjectTrainPage } from './app.po';

describe('project-train App', () => {
  let page: ProjectTrainPage;

  beforeEach(() => {
    page = new ProjectTrainPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
