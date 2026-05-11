// Type declarations for remote micro-frontends loaded via Module Federation
declare module "activityMf/App" {
  import type { ComponentType } from "react";
  const App: ComponentType<any>;
  export default App;
}

// Add more remote declarations as needed:
// declare module "nutritionMf/App" { ... }
// declare module "analyticsMf/App" { ... }
