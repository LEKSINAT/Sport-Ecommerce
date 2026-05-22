const output = document.getElementById("health-output");
const pingButton = document.querySelector('[data-action="ping-health"]');

if (pingButton && output) {
  pingButton.addEventListener("click", async () => {
    output.textContent = "Loading...";

    try {
      const response = await fetch("/health");
      const data = await response.json();
      output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      output.textContent = `Request failed: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  });
}
