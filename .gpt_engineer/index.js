import { loadGetUserSnapshotEventListener } from "./get-user-snapshot";
import { loadReportUrlChangeEventListener } from "./report-url-change";

const main = () => {
  loadGetUserSnapshotEventListener();
  loadReportUrlChangeEventListener();
};

main();

