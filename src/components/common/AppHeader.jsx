// src/components/common/AppHeader.jsx
import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge, Space } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const { Header } = Layout;

const AppHeader = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { cartItemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { key: 'profile', label: <Link to="/profile">Hồ sơ</Link> },
        { key: 'orders', label: <Link to="/my-orders">Đơn hàng của tôi</Link> },
        { type: 'divider' },
        { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout },
    ];

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo" style={{ color: 'white', fontSize: '1.5rem' }}>
                <Link to="/" style={{ color: 'white' }}>JEWELRY</Link>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, justifyContent: 'center' }}>
                <Menu.Item key="1"><Link to="/">Trang Chủ</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/products">Sản Phẩm</Link></Menu.Item>
                {isAdmin && <Menu.Item key="3"><Link to="/admin">Trang Admin</Link></Menu.Item>}
            </Menu>
            <Space size="large">
                <Link to="/cart">
                    <Badge count={cartItemCount}>
                        <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
                    </Badge>
                </Link>
                {isAuthenticated? (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ color: 'white', marginLeft: 8 }}>{user.username}</span>
                        </a>
                    </Dropdown>
                ) : (
                    <Space>
                        <Link to="/login" style={{ color: 'white' }}>Đăng Nhập</Link>
                        <Link to="/register" style={{ color: 'white' }}>Đăng Ký</Link>
                    </Space>
                )}
            </Space>
        </Header>
    );
};

export default AppHeader;