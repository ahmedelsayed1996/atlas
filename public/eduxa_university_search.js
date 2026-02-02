/**
 * Eduxa University Search Embed Script
 *
 * Usage:
 * <div id="eduxa_university_search"></div>
 * <script src="https://yourdomain.com/eduxa_university_search.js"
 *         data-agency-key="YOUR_AGENCY_KEY"></script>
 */

(function () {
  const script = document.currentScript;
  const agencyKey = script.dataset.agencyKey;

  if (!agencyKey) {
    console.error('Eduxa Embed Error: Missing data-agency-key attribute');
    return;
  }

  const container = document.getElementById('eduxa_university_search');
  if (!container) {
    console.error(
      'Eduxa Embed Error: Container element with id="eduxa_university_search" not found',
    );
    return;
  }

  // Create iframe pointing to your Next.js page
  const iframe = document.createElement('iframe');
  const baseUrl = script.src.split('/eduxa_university_search.js')[0];
  iframe.src = `${baseUrl}/embed/search?agency_key=${encodeURIComponent(agencyKey)}`;
  iframe.style.width = '100%';
  iframe.style.height = '80vh';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.setAttribute('title', 'Eduxa University Search');
  iframe.setAttribute('allow', 'cross-origin-isolated');

  container.appendChild(iframe);
})();

/*
What the agency receives (final form):

<!-- Eduxa University Search -->
<div id="eduxa_university_search"></div>

<script
  src="https://eduxa.com/embed/eduxa_university_search.js"
  data-agency-key="YOUR_AGENCY_KEY">
</script>

Instructions:
  1. Replace YOUR_AGENCY_KEY with your actual agency API key
  2. Paste this snippet into any page where you want the Eduxa search to appear
  3. Works with WordPress, Elementor, static HTML, and any CMS
*/
