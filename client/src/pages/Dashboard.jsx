import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import API from '../services/api';
import { useSocket } from '../context/SocketContext';

const Dashboard = () => {
    // In a real app, we'd fetch stats and recent orders here
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0
    });

    const socket = useSocket();

    useEffect(() => {
        // Mock initial data
        setStats({
            totalOrders: 150,
            totalRevenue: 24000,
            pendingOrders: 12
        });

        if (socket) {
            socket.on('orderPlaced', (newOrder) => {
                setStats(prev => ({
                    ...prev,
                    totalOrders: prev.totalOrders + 1,
                    totalRevenue: prev.totalRevenue + newOrder.totalAmount,
                    pendingOrders: prev.pendingOrders + 1
                }));
                // Optionally show a notification
                alert(`New Order Received! ID: ${newOrder.orderId}`);
            });
        }

        return () => {
            if (socket) {
                socket.off('orderPlaced');
            }
        };
    }, [socket]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Total Revenue
                        </Typography>
                        <Typography component="p" variant="h4">
                            ₹{stats.totalRevenue}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Active Orders
                        </Typography>
                        <Typography component="p" variant="h4">
                            {stats.activeOrders || 12}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Button href="/admin/menu" variant="outlined" sx={{ mr: 1 }}>
                                Manage Menu
                            </Button>
                            <Button href="/admin/scanner" variant="outlined">
                                Scan QR
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                {/* Recent Orders Table could go here */}
            </Grid>
        </Container>
    );
};

export default Dashboard;
