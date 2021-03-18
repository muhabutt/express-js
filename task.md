Create the frontend and backend for a small web app with these requirements:

- Create a frontend web app that shows a search input field to the user
- Create a backend service (with Node.js or PHP, with or without an existing framework)
- Submitting the search field sends an HTTP request to the backend service
- Create one REST API endpoint to the backend: `GET /search?query={query}`
- The backend should use the search query to fetch data from two or more external data sources.
  For example:
    - http://api.hel.fi/linkedevents/v1/search/
        - Example: http://api.hel.fi/linkedevents/v1/search/?format=json&q=taide
    - https://api.finna.fi/swagger-ui/?url=%2Fapi%2Fv1%3Fswagger#/Search/get_search
        - Example: https://api.finna.fi/api/v1/search?type=Title&field%5B%5D=title&field%5B%5D=images&field%5B%5D=urls&field%5B%5D=subjects&field%5B%5D=formats&lookfor=taide
    - You need not use these external data sources, and can use any other public
      data sources instead. The requirement is that the backend services fetches
      data from _two or more_ external sources for the given search query.
- The backend's `/search?query={query}` endpoint returns search results from all
  of the external data sources to the browser
- Show the search results in any way you wish in the frontend

The goal is for the backend's REST API endpoint (`GET /search`) to act as
an abstraction for multiple content sources (for example: api.hel.fi and api.finna.fi).

The local development environment should be easy for other developers to set up.
Write short "Getting started" instructions in a README.md file.


What we look at:

- How well the aforementioned requirements are met
- How bug-free the implementation is
- Performance: latency between the user typing a search query and the backend returning a response
- Clarity of the code
- How easy it is for other developers to get started with local development
- Your knowledge of ECMAScript >=6, and programming language knowledge in general
- Your knowledge of building a single-page app (e.g., setting up a local development environment; configuring package.json/npm/yarn; building the app)

