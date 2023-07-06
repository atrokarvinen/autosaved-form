export const tabs = [
  { label: "Home", to: "/" },
  { label: "Person info", to: "/person" },
  { label: "Account info", to: "/account" },
];

export const findTabIndex = (path: string) => {
  const pathItems = path.split("/");
  const lastPathItem = pathItems[pathItems.length - 1];
  const pathToFind = "/" + lastPathItem;
  const tabIndex = tabs.findIndex((tab) => pathToFind === tab.to);
  return tabIndex === -1 ? 0 : tabIndex;
};
