import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Paper,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, totalAmount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5">Your cart is empty</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/')}>
                    Browse Menu
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <List>
                    {cartItems.map((item) => (
                        <ListItem key={item._id} divider>
                            <ListItemText
                                primary={item.name}
                                secondary={`₹${item.price} x ${item.qty}`}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                <IconButton onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography sx={{ mx: 2 }}>{item.qty}</Typography>
                                <IconButton onClick={() => updateQty(item._id, item.qty + 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => removeFromCart(item._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Total: ₹{totalAmount}</Typography>
                    <Button variant="contained" size="large" onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Cart;
