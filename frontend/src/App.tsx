import { FrappeProvider } from "frappe-react-sdk";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="h-screen">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
          <AppRoutes />
        </BrowserRouter>
      </FrappeProvider>
    </div>
  );
}

export default App;
