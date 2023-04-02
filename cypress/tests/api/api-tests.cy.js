/// <reference types="cypress" />
describe("API tests for /login endpoint", () => {
  it("Login to page.", () => {
    cy.request({
      method: "GET",
      url: "https://www.edu.goit.global/pl/account/login",
    }).as("details");
    cy.get("@details").its("status").should("eq", 200);
    cy.get("@details").its("body").should("not.be.empty");
    cy.get("@details").then((response) => {
      cy.log("Response was: " + JSON.stringify(response.body));
    });

    it("Log in.", () => {
      cy.request({
        method: "POST",
        url: "https://www.edu.goit.global/pl/account/login",
        body: {
          userName: "Agnieszka@xxxx.pl",
          password: "1234567",
        },
      }).as("testData");
      cy.get("@testData").its("status").should("eq", 200);
    });

    cy.get("@testData").then((response) => {
      const userNameId = response.body.length;
      cy.log("userName is created id = " + userNameId);
      Cypress.env("userNameId", userNameId);
      cy.log("Response body:" + JSON.stringify(response.body));
    });

    // Step 1
    cy.then(() => {
      const id = Cypress.env("userNameId");
      cy.request({
        method: "DELETE",
        url: `https://www.edu.goit.global/pl/account/login/${id}`,
      }).as("details");
      cy.log("Request was sent.");
    });

    // Step 2
    cy.get("@details").its("status").should("eq", 200);
    cy.get("@details").its("body").should("not.be.empty");
    cy.log("Request status is correct and response body is not empty.");

    // Step 3
    cy.get("@details").then((response) => {
      cy.wrap(JSON.stringify(response.body))
        .should("not.include", "Agnieszka@xxxx.pl")
        .should("not.include", "1234567");
    });
    cy.log("Verify that response excludes payload.");
  });

  describe("GoIt", () => {
    const bodyData = {
      bodyKey: "bodyValue",
    };

    const request = {
      method: "POST",
      url: "https://www.edu.goit.global/pl/account/login/post",
      body: bodyData,
      failOnStatusCode: false,
    };

    it("complex post test", () => {
      cy.request(request).then((response) => {
        assert.equal(200, response.status);
        assert.notStrictEqual(bodyData, response.body.data);
      });
      describe("GOIT tests", () => {
        const request = {
          method: "GET",
          url: "https://www.edu.goit.global/pl/account/login/headers",
          headers: {
            "user-agent": "My test user-agent",
          },
          failOnStatusCode: false,
        };

        it("test single response body key", () => {
          cy.request(request).then((response) => {
            assert.equal("userName", response.body["userName"]);
          });
        });

        it("test that user-agent set correctly", () => {
          cy.request(request).then((response) => {
            assert.equal(200, response.status);
            assert.equal(
              "My test user-agent",
              response.requestHeaders["user-agent"]
            );
          });
          describe("GoIT tests", () => {
            const request = {
              method: "GET",
              url: "https://www.edu.goit.global/pl/account/login/headers",
              headers: {
                Cookie: "cookieName=cookieValue",
              },
              failOnStatusCode: false,
            };

            it("Send cookies", () => {
              cy.request(request).then((response) => {
                assert.equal(200, response.status);
                assert.equal(
                  "cookieName=cookieValue",
                  response.requestHeaders["Cookie"]
                );
                it("test check response status", () => {
                  cy.request(request).then((response) => {
                    assert.equal(200, response.status);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
