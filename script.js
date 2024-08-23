document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const addressInput = document.getElementById('address');
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
  
    // Fetch countries and populate the country dropdown
    fetch('/api/countries') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        data.countries.forEach(country => {
          const option = document.createElement('option');
          option.value = country.code;
          option.textContent = country.name;
          countrySelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));
  
    // Fetch states based on selected country
    countrySelect.addEventListener('change', () => {
      const selectedCountry = countrySelect.value;
  
      fetch(`/api/states?country=${selectedCountry}`) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
          stateSelect.innerHTML = '<option value="">Select State</option>'; // Clear previous states
          data.states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            stateSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching states:', error));
    });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get form data
      const name = nameInput.value;
      const email = emailInput.value;
      const phone = phoneInput.value;
      const password = passwordInput.value;
      const address = addressInput.value;
      const country = countrySelect.value;
      const state = stateSelect.value;
  
      // Perform validation (optional)
  
      // Send data to server
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
          address: address,
          country: country,
          state: state
        })
      })
      .then(response => {
        if (response.ok) {
          // Handle successful registration
          console.log('Registration successful!');
          // Redirect to a success page or show a success message
        } else {
          // Handle registration error
          console.error('Registration failed!');
          // Display an error message to the user
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user
      });
    });
  });
  