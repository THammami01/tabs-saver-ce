export interface ITab {
  id: number;
  favIconUrl: string;
  title: string;
  url: string;
}

export const getCurrWin = async () => await chrome.windows.getCurrent();

export const getCurrWinTabs = async (currWinId: number) => {
  const tabs = await chrome.tabs.query({});

  const currWinTabs = tabs
    .filter((tab) => tab.windowId === currWinId)
    .map(({ id, favIconUrl, title, url }) => ({
      id,
      favIconUrl,
      title,
      url,
    }));

  return currWinTabs;
};

export const createNewWin = async (currWinTabs?: ITab[]) =>
  await chrome.windows.create({
    state: 'maximized',
    url: currWinTabs?.map((tab) => tab.url),
  });
