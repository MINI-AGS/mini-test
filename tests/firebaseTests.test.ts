const assert = require("assert");
const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "mini-test-ags";

describe("Firebase Tests", () => {
  it("should return true", () => {
    assert.equal(true, true);
  });

  it("Can read from the database", async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
      })
      .firestore();

    const testDoc = db.collection("ejemplos").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });
});
