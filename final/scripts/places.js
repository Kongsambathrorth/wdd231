document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year");
  const lastModifiedElement = document.getElementById("last-modified");

  const currentYear = new Date().getFullYear();
  const lastModified = document.lastModified;

  currentYearElement.textContent = currentYear;
  lastModifiedElement.textContent = lastModified;

  const temperature = 30; // Valor estático de exemplo em Celsius
  const windSpeed = 15; // Valor estático de exemplo em km/h

  const windChillElement = document.getElementById("wind-chill");
  windChillElement.textContent = calculateWindChill(temperature, windSpeed);

  function calculateWindChill(temp, wind) {
    if (temp <= 10 && wind > 4.8) {
      return (
        (
          13.12 +
          0.6215 * temp -
          11.37 * Math.pow(wind, 0.16) +
          0.3965 * temp * Math.pow(wind, 0.16)
        ).toFixed(2) + " °C"
      );
    } else {
      return "N/A";
    }
  }
});
