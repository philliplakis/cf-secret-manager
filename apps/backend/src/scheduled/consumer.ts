import type { Bindings } from "../common/bindings";

export default async function scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
  const delayedProcessing = async (cron: string) => {
    // await cronTask(env);
    console.log("Running delayed process...", { cron }, { env });
  };
  switch (event.cron) {
    case "0 * * * *":
      try {
        //  Runs hourly.
        console.log("Upcoming bookings fetched successfully");
      } catch (error) {
        console.error("Error 0 * * * *:", error);
      }
      //
      ctx.waitUntil(delayedProcessing(event.cron));
      break;
    case "0 7 * * *":
      //
      try {
        // Morning @ 7am emails to venues....
        console.log("Daily bookings fetched successfully:");
      } catch (error) {
        console.error("Error 0 7 * * *:", error);
      }
      //
      ctx.waitUntil(delayedProcessing(event.cron));
      break;
  }
}
