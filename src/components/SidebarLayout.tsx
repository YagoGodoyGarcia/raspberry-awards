import { useState, useEffect } from 'react';
import { NavLink, ScrollArea } from '@mantine/core';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Burger, useMantineTheme } from '@mantine/core';

const SidebarLayout = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Define breakpoint sm (ex: 768px)
  const breakpoint = parseInt(theme.breakpoints.sm, 10);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha sidebar automaticamente quando a tela fica pequena
  useEffect(() => {
    if (windowWidth < breakpoint) {
      setSidebarOpened(false);
    } else {
      setSidebarOpened(true);
    }
  }, [windowWidth, breakpoint]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpened ? 200 : 0,
          overflow: 'hidden',
          transition: 'width 0.3s',
          borderRight: '1px solid #ddd',
          backgroundColor: '#f8f9fa',
        }}
      >
        <ScrollArea style={{ height: '100%' }}>
          <NavLink
            label="Dashboard"
            component={Link}
            to="/"
            active={location.pathname === '/'}
            onClick={() => {
              if (windowWidth < breakpoint) setSidebarOpened(false);
            }}
          />
          <NavLink
            label="List"
            component={Link}
            to="/list"
            active={location.pathname === '/list'}
            onClick={() => {
              if (windowWidth < breakpoint) setSidebarOpened(false);
            }}
          />
        </ScrollArea>
      </div>

      {/* Conteúdo principal */}
      <div style={{ flex: 1, padding: 16 }}>
        {/* Burger para abrir/fechar o menu em telas pequenas */}
        {windowWidth < breakpoint && (
          <Burger
            opened={sidebarOpened}
            onClick={() => setSidebarOpened((o) => !o)}
            size="sm"
            mb="md"
            color={theme.colors.gray[6]}
          />
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
