// app_server/controllers/travel.js
const fetch = require('cross-fetch');            // ← you’ve installed this!
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options       = { method: 'GET', headers: { 'Accept': 'application/json' } };

// Helper: count how many of each category
function countCategories(trips) {
  return trips.reduce((acc, trip) => {
    const cat = trip.category?.toLowerCase() || 'other';
    if (cat === 'cruises')   acc.cruises++;
    if (cat === 'mountains') acc.mountains++;
    if (cat === 'beaches')   acc.beaches++;
    return acc; 
  }, { cruises: 0, mountains: 0, beaches: 0 });
} 

exports.travel = async function (req, res, next) {
  try {
    // 1) Fetch all trips from your API
    const apiRes = await fetch(tripsEndpoint, options);
    let trips   = await apiRes.json();
    if (!Array.isArray(trips)) trips = [];

    // 2) Compute the raw category counts (wireframe #3)
    const counts = countCategories(trips); 

    // 3) Filter by category and/or search term (wireframe #4)
    const currentCategory = (req.query.category || '').toLowerCase();
    const searchTerm      = (req.query.search   || '').toLowerCase();
    let filtered = trips.filter(t => {
      let keep = true;
      if (currentCategory) {
        keep = t.category?.toLowerCase() === currentCategory;
      }
      if (keep && searchTerm) {
        keep = t.name.toLowerCase().includes(searchTerm);
      }
      return keep;
    });

    // 4) Pagination (wireframe #6)
    const pageSize    = 5;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const startIdx    = (currentPage - 1) * pageSize;
    const pagedTrips  = filtered.slice(startIdx, startIdx + pageSize);

    // 5) Finally render the view with **all** the bits the wireframe expects
    res.render('travel', {
      title:           'Travlr Getaways | Travel',
      trips:           pagedTrips,
      cruiseCount:     counts.cruises,
      mountainCount:   counts.mountains,
      beachCount:      counts.beaches,
      searchTerm:      req.query.search   || '',
      currentCategory: req.query.category || '',
      prevPage:        currentPage > 1 ? currentPage - 1 : null,
      nextPage:        (startIdx + pageSize) < filtered.length ? currentPage + 1 : null
    });

  } catch (err) {
    next(err);
  }
};

