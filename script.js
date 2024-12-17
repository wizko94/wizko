function catchFish() {
  const location = document.getElementById('location-name').textContent;
  const rod = document.getElementById('rod-name').textContent;
  alert(`You caught a fish at the ${location} with your ${rod}!`);
}
