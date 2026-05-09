import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Typography, Divider, AppBar, Toolbar, IconButton, useMediaQuery, Theme 
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import styles from './AdminLayout.module.css';


export function AdminLayout() {
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Дашборд" },
    { to: "/admin/orders", icon: <ShoppingBagIcon />, label: "Заказы" },
    { to: "/admin/catalog", icon: <InventoryIcon />, label: "Каталог" },
  ];

  if (location.pathname === "/admin") {
    return <Outlet />;
  }

  const drawerContent = (
    <>
      <Box className={`${styles.adminSidebarHeader}`}>
        <EmojiObjectsIcon sx={{ color: '#60a5fa' }} />
        <Typography variant="h6" className="bold">
          Магазин ламп
        </Typography>
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
                className={active ? "${styles.adminNavItemActive}" : ""}
                sx={{ 
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: active ? 'primary.dark' : 'rgba(255,255,255,0.08)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: active ? 'white' : 'grey.400', minWidth: 40 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={link.label} 
                  slotProps={{ primary: { sx: { fontWeight: active ? 700 : 500, color: active ? 'white' : 'grey.300' } } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            component={RouterLink} 
            to="/"
            sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
          >
            <ListItemIcon sx={{ color: 'grey.400', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выход" sx={{ color: 'grey.300' }} />
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
            paper: { className: "${styles.adminDrawerPaper}" } 
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
            paper: { className: "${styles.adminDrawerPaper}" } 
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box className={`${styles.adminMainContainer}`}>
        <AppBar position="static" className={`${styles.adminToolbar}`}>
          <Toolbar>
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
          </Toolbar>
        </AppBar>

        <Box component="main" className={`${styles.adminMainContent}`}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
