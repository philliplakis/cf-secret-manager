import type { Bindings } from "../common/bindings";
import fileUploaded from "./file-uploaded";
import type { R2BucketEvent } from "./types";

export default async function consumer(batch: MessageBatch<R2BucketEvent>, env: Bindings) {
  console.log("Queue triggered");
  console.log("batch.queue", batch.queue);
  const messages = batch.messages.map((m) => m.body);
  switch (batch.queue) {
    case "retransact-file-upload":
      return await fileUploaded(messages as R2BucketEvent[], env);
    case "retransact-process-line":
    default:
      break;
  }
  return;
}
