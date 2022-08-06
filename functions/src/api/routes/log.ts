import {logger, https, region} from "firebase-functions";

export const createLog = region("europe-west1").https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated.",
      );
    }
    logger.warn(data);
    return {success: true};
  },
);
