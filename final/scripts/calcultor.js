document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('user-slider');
  const userCountDisplay = document.getElementById('user-count-display');
  const tierName = document.getElementById('tier-name');
  const totalPrice = document.getElementById('total-price');
  const saveBtn = document.getElementById('save-plan-btn');
  const saveStatus = document.getElementById('save-status');

  // Load saved preference from localStorage if available
  const savedUserCount = localStorage.getItem('lumina_user_count');
  if (savedUserCount && slider) {
    slider.value = savedUserCount;
  }

  function calculatePricing(users) {
    let tier = "Standard Tier";
    let rate = 5; // $5 per user for base tier

    // Conditional branching for volume discounting tiers
    if (users >= 300) {
      tier = "Enterprise Tier";
      rate = 3;
    } else if (users >= 100) {
      tier = "Professional Tier";
      rate = 4;
    }

    const cost = users * rate;

    // Update DOM elements using template literals
    if (userCountDisplay) userCountDisplay.textContent = users;
    if (tierName) tierName.textContent = tier;
    if (totalPrice) totalPrice.textContent = `$${cost}/mo`;
  }

  // Initial calculation run
  if (slider) {
    calculatePricing(slider.value);

    // Event listener for slider input
    slider.addEventListener('input', (e) => {
      const currentUsers = e.target.value;
      calculatePricing(currentUsers);
    });
  }

  // Save to localStorage event listener
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const currentUsers = slider.value;
      localStorage.setItem('lumina_user_count', currentUsers);
      
      if (saveStatus) {
        saveStatus.textContent = `Preferences saved successfully for ${currentUsers} users!`;
        saveStatus.style.color = '#16A34A';
        setTimeout(() => {
          saveStatus.textContent = '';
        }, 3000);
      }
    });
  }
});