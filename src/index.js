const loadEnv = require("./utils/load-env");
const { processUserSessions } = require("./process-user-sessions");
const { sendSessionsReport } = require("./send-sessions-report");

loadEnv();

(async () => {
  console.log("--- CREATE SESSIONS REPORT ---");

  const sessionsReport = await processUserSessions();

  console.log("SESSIONS REPORT --> ", JSON.stringify(sessionsReport, null, 2));

  await sendSessionsReport(sessionsReport);

  console.log("--- REPORT SENT ---");
})();
