describe("movies testing project", () => {
  const pass = "do_not_share!1";

  it("login and verify if a list of movie tiles is displayed", () => {

    cy.visit("https://betterqa.ro/top-movies/");
    cy.get("input[name=post_password]").type(pass);
    cy.get("input[name=Submit]").click();
    cy.get(".movies [class*=jss10]").each((item, index, list) => {
      expect(list).to.have.length(40);

    });
  });

  it("open the first movie and make sure the date is correct", () => {

    cy.get("button[class*=jss109]").eq(0).click();
    cy.get("input").eq(3).should("have.value", "1994-09-23");
    cy.get("button[class*=jss109]").eq(20).click();

  });
  it("search for star trek, st:fc is displayed and the shawshank is no longer visible", () => {

    const movie = "Star Trek";
    const movieTitle = "Star Trek: First Contact";
    const notVisMovie = "The Shawshank Redemption";

    cy.get("input[type=search]").type(movie).type("{enter}");
    cy.contains(movieTitle);
    cy.get(".movies").should("not.have.text", notVisMovie);

  });

  it("select a movie and check the data", () => {

    const movieThatILike = "Ted";

    cy.get("input[type=search]").clear();
    cy.get("input[type=search]").type(movieThatILike).type("{enter}");
    cy.contains(movieThatILike);
    cy.get("button[type=button]").eq(0).click();
    cy.get("input").eq(3).should("have.value", "2012-06-29");
    cy.get("input").eq(4).should("have.value", "99.675");
    cy.get("input").eq(5).should("have.value", "6.4");
    cy.get("input").eq(6).should("have.value", "10632");

  });

  it("bug detected: if you enter an empty string in the search bar the page will be blank", () => {

    cy.get("button[class*=jss109]").eq(20).click();
    cy.get("input[type=search]").clear().type("{enter}");
    
  });
});
