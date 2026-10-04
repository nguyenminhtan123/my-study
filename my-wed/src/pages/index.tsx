import { templates } from "@/templates";

// Step 1 of the gallery plan: still shows only the first template.
// The gallery list and template detail pages replace this later.
function HomePage() {
  const { Component, demoData } = templates[0];
  return <Component data={demoData} />;
}

export default HomePage;
