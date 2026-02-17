import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Create order
            const orderData = {
                items: cartItems.map((item) => ({
                    menuItem: item._id,
                    qty: item.qty,
                    price: item.price,
                })),
                totalAmount,
            };

            const { data: order } = await API.post('/order/create', orderData);

            // Simulate Payment
            await API.post('/order/pay', { orderId: order.orderId });

            // Clear cart
            clearCart();

            // Redirect to success page
            navigate(`/order-success/${order._id}`);
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>No items to checkout.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Checkout
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Order Summary</Typography>
                    {cartItems.map((item) => (
                        <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                            <Typography>
                                {item.name} x {item.qty}
                            </Typography>
                            <Typography>₹{item.price * item.qty}</Typography>
                        </Box>
                    ))}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            borderTop: '1px solid #ccc',
                            pt: 2,
                        }}
                    >
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">₹{totalAmount}</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                    Payment Details (Mock)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Card Number" fullWidth disabled defaultValue="4242 4242 4242 4242" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Expiry" fullWidth disabled defaultValue="12/30" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="CVV" fullWidth disabled defaultValue="123" />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 4 }}
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : `Pay ₹${totalAmount}`}
                </Button>
            </Paper>
        </Container>
    );
};

export default Checkout;
