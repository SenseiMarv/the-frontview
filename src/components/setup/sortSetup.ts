import type { SetupCollection } from "../../content/config.js";

export const sortSetupByCustomOrder = (setup: SetupCollection[]) => {
  const sortingOrder = [
    "system",
    "editor",
    "terminal",
    "version-control",
    "task-management",
  ];

  // `sort()` mutates the original array, so it should be called on a clone
  const arr = setup;
  return arr.sort((previousSetup, followingSetup) => {
    return (
      sortingOrder.indexOf(previousSetup.slug) -
      sortingOrder.indexOf(followingSetup.slug)
    );
  });
};
