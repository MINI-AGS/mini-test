import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

import fs from "fs";

import { setDoc } from "firebase/firestore";

import { createValidRecordData } from "./data/validRecord";
import { createUnvalidRecordData } from "./data/unvalidRecord";

const MY_PROJECT_ID = "mini-test-ags";

describe("Firebase Tests", () => {
  it("Can write to the database with valid data", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });

    const db = testEnv.unauthenticatedContext().firestore();
    const data = createValidRecordData();
    await assertSucceeds(setDoc(db.collection("data").doc("testDoc"), data));
  });

  it("Cannot write to the database with invalid data", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });

    const db = testEnv.unauthenticatedContext().firestore();
    const data = createUnvalidRecordData();
    await assertFails(setDoc(db.collection("data").doc("testDoc"), data));
  });

  it("Cannot read from the database", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });

    const db = testEnv.unauthenticatedContext().firestore();
    const testDoc = db.collection("data").doc("testDoc");
    await assertFails(testDoc.get());
  });

  it("Cannot delete from the database", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });

    const db = testEnv.unauthenticatedContext().firestore();
    const testDoc = db.collection("data").doc("testDoc");
    await assertFails(testDoc.delete());
  });

  it("Cannot update the database", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });

    const db = testEnv.unauthenticatedContext().firestore();
    const testDoc = db.collection("data").doc("testDoc");
    await assertFails(testDoc.update({ field: "value" }));
  });
});
