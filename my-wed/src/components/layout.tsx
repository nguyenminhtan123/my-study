import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";

import GalleryPage from "@/pages/index";
import TemplateDetailPage from "@/pages/template-detail";

const Layout = () => {
  return (
    <App theme="light">
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<GalleryPage />}></Route>
            <Route
              path="/template/:id"
              element={<TemplateDetailPage />}
            ></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
