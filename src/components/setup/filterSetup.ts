import { isBefore } from "date-fns";

import type { SetupCollection } from "../../content/config.js";

/**
 * Filter setup to show only setup that are not in draft status and have a pubDate before the current date
 */
export const getLiveSetup = (setup: SetupCollection[]) =>
  setup.filter(
    (s) =>
      s.data.draft === undefined &&
      isBefore(new Date(s.data.pubDate), new Date()),
  );
