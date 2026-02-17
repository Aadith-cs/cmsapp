import { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    FormControlLabel,
    Box
} from '@mui/material';
import API from '../services/api';

const MenuManager = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        stockLevel: 0,
        available: true
    });

    const fetchMenu = useCallback(async () => {
        try {
            const { data } = await API.get('/menu');
            setMenuItems(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpen = (item = null) => {
        if (item) {
            setEditMode(true);
            setCurrentId(item._id);
            setFormData({
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image,
                stockLevel: item.stockLevel,
                available: item.available
            });
        } else {
            setEditMode(false);
            setFormData({
                name: '',
                price: '',
                category: '',
                image: '',
                stockLevel: 0,
                available: true
            });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await API.put(`/menu/${currentId}`, formData);
            } else {
                await API.post('/menu', formData);
            }
            fetchMenu();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await API.delete(`/menu/${id}`);
                fetchMenu();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Menu Manager</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>
                    Add New Item
                </Button>
            </Box>

            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography color="textSecondary">₹{item.price}</Typography>
                                <Typography variant="body2">Stock: {item.stockLevel}</Typography>
                                <Typography variant="body2" color={item.available ? 'success.main' : 'error.main'}>
                                    {item.available ? 'Active' : 'Inactive'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleOpen(item)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit Item' : 'Add Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Stock Level"
                        type="number"
                        fullWidth
                        value={formData.stockLevel}
                        onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.available}
                                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                            />
                        }
                        label="Available"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MenuManager;
