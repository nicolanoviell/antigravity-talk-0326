Create a responsive web page featuring 10 iconic artworks by Andy Warhol, fetching the data dynamically from The Metropolitan Museum of Art Collection API (https://metmuseum.github.io/).

Step 1: API Validation Class
Before building the UI, write a robust Testing Class (in JavaScript/TypeScript) to validate the API endpoints. The class should:

Search for "Andy Warhol" to retrieve a list of Object IDs.

Verify that the API returns valid JSON and that the required fields (Title, Primary Image URL, Date) are present for at least 10 items.

Handle potential errors (e.g., rate limits or missing images) and log the status to the console.

Step 2: Web Page Development
Once the API logic is validated, generate the HTML, CSS, and JS for the web page:

Grid Layout: Display the 10 artworks in a clean, gallery-style grid.

Card Design: Each card must show the artwork's image, title, and creation year.

Pop Art Aesthetic: Use a design language inspired by Warhol’s style (e.g., bold typography, vibrant accent colors, high contrast).

Functionality: Implement a loading state while the API is fetching data.

Technical Constraints: Use modern Fetch API, avoid external heavy frameworks unless necessary, and ensure the code is modular and well-documented.