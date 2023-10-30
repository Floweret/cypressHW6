//https://api.artic.edu/docs/#quick-start
describe("Homework 4", () => {
  it("1. response code should be 200", () => {
    cy.request("https://api.artic.edu/api/v1/artworks/129884").then(
      (response) => {
        const status = response.status;

        assert.equal(200, status);
      }
    );
  });
  // it("2. response code should be 200 Fail Version", () => {
  //   const req = {
  //     url: "https://api.artic.edu/api/v1/artworks/129884gythjy",
  //     failOnStatusCode: false,
  //   };
  //   cy.request(req).then((response) => {
  //     const status = response.status;

  //     assert.equal(200, status);
  //   });
  // });

  it("3. Method POST. Response code should be 200", () => {
    const request = {
      method: "POST",
      url: "https://api.artic.edu/api/v1/artworks/search",
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal(200, response.status);
    });
  });

  it("4. test that header set correctly", () => {
    const request = {
      method: "POST",
      url: "https://api.artic.edu/api/v1/artworks/search",
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal("application/json", response.requestHeaders["Content-Type"]);
    });
  });

  it("5. test that user-agent set correctly", () => {
    const request = {
      url: "https://api.artic.edu/api/v1/artworks/24645",
      headers: {
        "AIC-User-Agent": "aic-bash (engineering@artic.edu)",
      },
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal(
        "aic-bash (engineering@artic.edu)",
        response.requestHeaders["AIC-User-Agent"]
      );
    });
  });

  it("6. test that query set correctly in response", () => {
    const request = {
      url: "https://api.artic.edu/api/v1/artworks",
      qs: {
        limit: "2",
      },
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      console.log(response.body);

      assert.equal("2", response.body.pagination.limit);
    });
  });

  function getRandom(maxValue) {
    return Math.floor(Math.random() * maxValue);
  }
  it("7. test random ids", () => {
    for (let i = 0; i < 5; i++) {
      const randomId = getRandom(10000) + 15;

      const request = {
        url: "https://api.artic.edu/api/v1/artworks/",
        qs: {
          id: randomId,
        },
        failOnStatusCode: false,
      };

      cy.request(request).then((response) => {
        assert.isTrue(response.status == 200);
      });
    }
  });

  it("8. response duration", () => {
    const request = {
      url: "https://api.artic.edu/api/v1/artworks/24645",
    };
    cy.request(request).then((response) => {
      assert.isTrue(response.duration < 2000);
    });
  });

  it("9. body is searched category", () => {
    const request = {
      url: "https://api.artic.edu/api/v1/artists",
    };
    cy.request(request).then((response) => {
      assert.equal(true, response.body.data[0].is_artist);
    });
  });

  it("10. body is searched api_model", () => {
    const request = {
      url: "https://api.artic.edu/api/v1/category-terms/search/",
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal("category-terms", response.body.data[0].api_model);
    });
  });
});
