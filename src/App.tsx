import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { ClientLayout } from "./components/layout/ClientLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { ConstructorPage } from "./pages/ConstructorPage";
import { CartPage } from "./pages/CartPage";
import { RequestCallPage } from "./pages/RequestCallPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";

import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminCatalogPage } from "./pages/admin/AdminCatalogPage";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f9fafb',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="constructor" element={<ConstructorPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="request-call" element={<RequestCallPage />} />
              <Route path="track" element={<TrackOrderPage />} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminLoginPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="catalog" element={<AdminCatalogPage />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}
