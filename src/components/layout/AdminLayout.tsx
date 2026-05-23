import { Outlet, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, AppBar, Toolbar, IconButton, useMediaQuery, Theme
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState, useEffect } from "react";
import styles from './AdminLayout.module.css';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, validateToken } from "../../redux/authActions";


export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/admin') && location.pathname !== '/admin') {
      dispatch(validateToken() as any);
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/admin') && location.pathname !== '/admin' && !isAuthenticated && !localStorage.getItem('admin_token')) {
      navigate('/admin');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await dispatch(logout() as any);
    navigate("/admin");
  };

  const links = [
    { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Дашборд" },
    { to: "/admin/orders", icon: <ShoppingBagIcon />, label: "Заказы" },
    { to: "/admin/catalog", icon: <InventoryIcon />, label: "Каталог" },
/*    { to: "/admin/preorders", icon: <PhoneIcon />, label: "Заявки" },*/
    { to: "/admin/register", icon: <PersonAddIcon />, label: "Регистрация" },
  ];

  if (location.pathname === "/admin") {
    return <Outlet />;
  }

  const drawerContent = (
      <>
        <Box className={`${styles.adminSidebarHeader}`} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiObjectsIcon sx={{ color: '#f59e0b' }} />
            <Typography variant="h6" className="bold" sx={{ color: '#000000' }}>
              Магазин ламп
            </Typography>
          </Box>
          {user && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium', fontSize: '0.8rem', mt: 0.5 }}>
                👤 Администратор: <strong>{user.username || user.name || "admin"}</strong>
              </Typography>
          )}
        </Box>
        <List sx={{ flexGrow: 1, px: 2 }}>
          {links.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
                <ListItem key={link.to} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                      component={RouterLink}
                      to={link.to}
                      onClick={isMobile ? handleDrawerToggle : undefined}
                      className={active ? styles.adminNavItemActive : ""}
                      sx={{
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: active ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                        }
                      }}
                  >
                    <ListItemIcon sx={{ color: active ? 'white' : '#000000', minWidth: 40 }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={link.label}
                        slotProps={{ primary: { sx: { fontWeight: active ? 700 : 500, color: active ? 'white' : '#000000' } } }}
                    />
                  </ListItemButton>
                </ListItem>
            );
          })}
        </List>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <List sx={{ p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
                onClick={handleLogout}
                sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
            >
              <ListItemIcon sx={{ color: '#000000', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выход" slotProps={{ primary: { sx: { color: '#000000', fontWeight: 500 } } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </>
  );

  return (
      <Box className={`${styles.adminLayout}`}>
        {/* Desktop Drawer */}
        {!isMobile && (
            <Drawer
                className={`${styles.adminDrawer}`}
                variant="permanent"
                anchor="left"
                slotProps={{
                  paper: { className: styles.adminDrawerPaper }
                }}
            >
              {drawerContent}
            </Drawer>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                slotProps={{
                  paper: { className: styles.adminDrawerPaper }
                }}
            >
              {drawerContent}
            </Drawer>
        )}

        <Box className={`${styles.adminMainContainer}`}>
          <AppBar position="static" className={`${styles.adminToolbar}`}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" noWrap component="div" className="bold">
                  {links.find(l => location.pathname.startsWith(l.to))?.label || 'Панель управления'}
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Box component="main" className={`${styles.adminMainContent}`}>
            <Outlet />
          </Box>
        </Box>
      </Box>
  );
}
