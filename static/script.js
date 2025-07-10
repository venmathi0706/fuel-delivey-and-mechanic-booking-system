document.addEventListener("DOMContentLoaded", () => {
    // Login Form Handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Login Successful!");
        window.location.href = "order.html";
      });
    }
  
    // Signup Form Handling
    // const signupForm = document.getElementById("signupForm");
    // if (signupForm) {
    //   signupForm.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     alert("Account Created Successfully!");
    //     window.location.href = "order.html"; 
    //   });

   // }
    document.addEventListener("DOMContentLoaded", function () {
      // Initialize the map centered on a default location
      const map = L.map("map").setView([51.505, -0.09], 13); // Default coordinates (London)
    
      // Set up the map layers (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    
      // Initialize Geocoder control (using Nominatim for real-time location search)
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,  // We won't use the default popup for geocoding
      }).addTo(map);
    
      // Adding event listener on the location input field for real-time location search
      const locationInput = document.getElementById("location");
      locationInput.addEventListener("input", function () {
        const query = locationInput.value;
        if (query.length >= 3) { // Trigger search after typing 3 characters
          geocoder.geocode(query, function (results) {
            if (results && results.length > 0) {
              // Get the first search result
              const firstResult = results[0];
              const { lat, lng, name } = firstResult.center;
    
              // Update the map to show the selected location
              map.setView([lat, lng], 13);
    
              // Add a marker at the location
              L.marker([lat, lng])
                .addTo(map)
                .bindPopup(name) // Name of the location
                .openPopup();
            }
          });
        }
      });
    
      // Handling form submission to generate a Track ID
      const orderForm = document.getElementById("orderForm");
      if (orderForm) {
        orderForm.addEventListener("submit", function (e) {
          e.preventDefault();
    
          const trackId = 'TRK' + Math.floor(100000 + Math.random() * 900000); // Random track ID
    
          // Show success message with Track ID
          alert("Your fuel order has been placed successfully!\nTrack ID: " + trackId);
    
          // Redirect to track.html with Track ID in the URL
          window.location.href = "track.html?trackId=" + encodeURIComponent(trackId);
        });
      }
    });
    
    // Order Form Handling
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
      orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const trackId = 'TRK' + Math.floor(100000 + Math.random() * 900000); // Generate random track ID
  
        // Show success message with Track ID
        alert("Your fuel order has been placed successfully!\nTrack ID: " + trackId);
  
        // Redirect to track.html with Track ID in the URL
        window.location.href = "track.html?trackId=" + encodeURIComponent(trackId);
      });
    }
  
    // Track Order Handling
    const trackForm = document.getElementById("trackForm");
    if (trackForm) {
      trackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const orderId = document.getElementById("orderId").value;
        const orderStatus = document.getElementById("orderStatus");
        if (orderId) {
          orderStatus.innerHTML = `<p>Your order #${orderId} is on the way!</p>`;
        } else {
          orderStatus.innerHTML = `<p>Order ID not found. Please try again.</p>`;
        }
      });
    }
  });
  
  