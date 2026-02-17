import { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import API from '../services/api';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await API.get('/menu');
                setMenuItems(data);
                const cats = ['All', ...new Set(data.map((item) => item.category))];
                setCategories(cats);
            } catch (error) {
                console.error('Failed to fetch menu:', error);
            }
        };
        fetchMenu();
    }, []);

    const filteredItems =
        selectedCategory === 'All'
            ? menuItems
            : menuItems.filter((item) => item.category === selectedCategory);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Menu
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {categories.map((cat) => (
                        <Tab key={cat} label={cat} value={cat} />
                    ))}
                </Tabs>
            </Box>

            <Grid container spacing={3}>
                {filteredItems.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image || 'https://via.placeholder.com/150'}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ₹{item.price}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color={item.available ? 'success.main' : 'error.main'}
                                    display="block"
                                    sx={{ mt: 1 }}
                                >
                                    {item.available ? 'Available' : 'Out of Stock'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    disabled={!item.available}
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;
