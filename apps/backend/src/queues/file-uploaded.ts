
import type { Bindings } from "../common/bindings";
import type { R2BucketEvent } from "./types";

export default async function fileUploaded(messages: Array<R2BucketEvent>, env: Bindings) {
  for (const body of messages) {
    // console.log("body", JSON.stringify(body));
    const key = body.object.key;
    console.log("KEY", key);
    const grabFile = await env.STORAGE.get(key);
    if (!grabFile) throw new Error("Failed to retrieve file from storage.");
    const uploadedAt = grabFile?.uploaded;
    console.log("uploadedAt", uploadedAt);
  }
}
