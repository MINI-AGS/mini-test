import { expect, test } from "@jest/globals";
import * as firebase from "@firebase/testing";

const PROJECT_ID = "mini-test-nonprod";

afterAll(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  await Promise.all(firebase.apps().map((app) => app.delete()));
});

test("firebase", async () => {
  const db = firebase.initializeTestApp({ projectId: PROJECT_ID }).firestore();
  const testDoc = db.collection("ejemplos_bad").doc("Ejemplo1");
  await firebase.assertSucceeds(testDoc.get());
});
