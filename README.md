# Travlr Getaways Full-Stack Web Application

A MEAN-stack travel booking app that serves both public customers and authenticated administrators. This README covers the architecture, key functionality, testing approach, and personal reflections on building Travlr Getaways.

---

## Architecture

**Customer-Facing (Express + Handlebars):**  
- Pages like Home, Travel, Rooms and Meals are rendered server-side with Handlebars templates in Express.  
- This provides fast first-load performance, SEO benefits, and straightforward URL routing (e.g. `/travel`, `/rooms`).  
- Shared partials (header, footer, trip-card) keep the UI consistent across pages.

**Admin Interface (Angular SPA):**  
- The admin dashboard is a standalone Angular app served from `/admin`.  
- It uses fetch()/HTTPClient to call the same REST API endpoints behind a JWT-protected gateway.  
- Admin users can create, update, and delete trips without full-page reloads, thanks to reusable components (e.g. `TripCardComponent`, `TripFormComponent`).

**Backend & Database (Node.js + MongoDB):**  
- Express handles routing and middleware (CORS, JSON parsing, JWT verification).  
- Mongoose models (`Trip`, `User`) map directly to MongoDB documents.  
- MongoDB’s flexible schema allowed us to iterate on trip properties (adding `tags`, `images`, `priceBreakdowns`) without migrations.

---

## Functionality

**JSON vs. JavaScript:**  
- We exchange pure-data JSON payloads between front end and back end. JSON has no methods or prototypes—just data—so it’s perfect for network transport.  
- On the Express side, `res.json(tripDoc)` sends Mongo documents as JSON; in Angular, `http.get<Trip[]>('/api/trips')` parses that JSON into typed objects.  
- Handlebars templates consume JSON by injecting values into view variables (e.g. `{{trip.name}}`, `{{trip.price}}`).

**Refactoring & Reusable UI Components:**  
- In Handlebars, we moved the trip card markup into a `{{> tripCard }}` partial used on both the listing page and the homepage.  
- In Angular, we built a `TripCardComponent` and a `TripFormComponent` so that list, detail, and edit views all share the same layout and validation logic.  
- **Benefits:**  
  - **Consistency:** One source of truth for how a trip is displayed.  
  - **Maintainability:** Fix formatting or validation once, and it propagates everywhere.  
  - **Speed:** New features (e.g. “favorite” button) can be added to every view by updating a single component/partial.

---

## Testing

We combined manual and automated testing to cover both functionality and security:

1. **Unit Tests (Jest + SuperTest):**  
   - Controller functions (`tripsController`) tested in isolation with mocked Mongoose models.  
   - Service helpers (e.g. JWT generation/verification) tested against valid and invalid inputs.

2. **Integration Tests:**  
   - End-to-end HTTP tests against a test instance of the Express server.  
   - Verified CRUD endpoints (`GET /api/trips`, `POST /api/trips`, etc.) return proper status codes and payloads.

3. **Security Tests (Postman + Automated Scripts):**  
   - Admin routes require a valid JWT in the `Authorization: Bearer <token>` header.  
   - Tests obtain a token via `POST /api/login` and reuse it for protected actions.  
   - Scenarios covered: missing token (401), expired token (401), insufficient permissions (403).

4. **Manual UI Testing:**  
   - Verified Handlebars pages render correctly with edge-case data (long names, missing images).  
   - Exercised the Angular admin UI in Chrome and Safari, ensuring form validation and error messaging work as expected.

---

## Reflection

Building Travlr Getaways has strengthened my skills across the full MEAN stack and in secure coding practices. I’ve learned to:

- **Design** clear, SEO-friendly server-rendered pages alongside a dynamic SPA.  
- **Model** real-world data in a NoSQL database and handle schema evolution without downtime.  
- **Secure** my API with JWT authentication, writing middleware that cleanly separates public and protected routes.  
- **Test** at every layer—from unit tests on controller logic to integration and security checks on endpoints.  
- **Refactor** aggressively for reuse, extracting shared code into Handlebars partials and Angular components.

These experiences make me a stronger full-stack developer and demonstrate to employers my commitment to secure, maintainable, and well-tested web applications.

---
