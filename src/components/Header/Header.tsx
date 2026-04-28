import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    IconButton,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useScrollTrigger
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../../context/CartContext';

interface NavigationItem {
    label: string;
    path: string;
}

const navItems: NavigationItem[] = [
    { label: 'Каталог', path: '/catalog' },
    { label: 'Конструктор', path: '/constructor' },
    { label: 'Статус заказа', path: '/track' },
    { label: 'Заказать звонок', path: '/request-call' },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { totalItems } = useCart();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} className="flex-column" sx={{ textAlign: 'center' }}>
            <Typography
                variant="h6"
                className="bold flex-center"
                sx={{
                    my: 2,
                    color: 'primary.main'
                }}
            >
                <EmojiObjectsIcon sx={{ mr: 1 }} />
                Магазин ламп
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{ textAlign: 'center' }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                className={`app-header ${trigger ? 'app-header-scrolled' : 'app-header-bordered'}`}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box className="flex-center" sx={{ flexGrow: { xs: 1, sm: 0 }, mr: { sm: 4 } }}>
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                className="logo-link"
                            >
                                <EmojiObjectsIcon />
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Магазин ламп
                                </Box>
                            </Typography>
                        </Box>

                        <Box className="flex-grow" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        <IconButton
                            component={RouterLink}
                            to="/cart"
                            className="cart-icon-btn"
                        >
                            <Badge badgeContent={totalItems} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}
