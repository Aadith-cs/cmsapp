import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Collapse,
  Alert,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Checkbox,
  Fab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Updatemenu({ menuItems, setMenuItems }) {
  const navigate = useNavigate();
  const [editableMenu, setEditableMenu] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [confDialog, setConfDialog] = useState(false);

  useEffect(() => {
    setEditableMenu(menuItems);
  }, [menuItems]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const updatePrice = (id, value) => {
    if (!/^\d*$/.test(value)) return;
    const priceNumber = Number(value);
    const updated = editableMenu.map((item) =>
      item.id === id
        ? { ...item, price: priceNumber, available: priceNumber > 0 }
        : item
    );
    setEditableMenu(updated);
  };

  const toggleDelete = (id) => {
    const updated = editableMenu.map((item) =>
      item.id === id
        ? { ...item, markedForDelete: !item.markedForDelete }
        : item
    );
    setEditableMenu(updated);
  };

  const handleAddConfirm = () => {
    const priceNumber = Number(newPrice);
    const newItem = {
      id: Date.now(),
      name: newName,
      price: priceNumber,
      available: priceNumber > 0,
    };
    setEditableMenu([...editableMenu, newItem]);
    setNewName("");
    setNewPrice("");
    setOpenDialog(false);
  };

  const saveChanges = () => {
    const finalMenu = editableMenu.filter((item) => !item.markedForDelete);
    setMenuItems(finalMenu);
    setEditableMenu(finalMenu);
    setIsDeleting(false);
    setShowAlert(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <IconButton onClick={() => navigate("/admin")} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Update Menu
          </Typography>
        </Box>

        <Collapse in={showAlert}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Changes saved successfully!
          </Alert>
        </Collapse>

        <Grid container spacing={2}>
          {editableMenu.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  position: "relative",
                  border: item.markedForDelete ? "2px solid red" : "none",
                  opacity: item.markedForDelete ? 0.6 : 1,
                  transition: "0.2s",
                }}
              >
                {isDeleting && (
                  <Checkbox
                    checked={item.markedForDelete || false}
                    onChange={() => toggleDelete(item.id)}
                    sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}
                  />
                )}
                
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                
                <TextField
                  fullWidth
                  size="small"
                  label="Price (₹)"
                  type="number"
                  value={item.price}
                  onChange={(e) => updatePrice(item.id, e.target.value)}
                  variant="outlined"
                  sx={{ mt: 1, bgcolor: "background.paper" }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Floating Action Buttons or Bottom Bar */}
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            zIndex: 10,
          }}
        >
          {isDeleting ? (
            <Fab color="error" variant="extended" onClick={() => setConfDialog(true)}>
              <DeleteIcon sx={{ mr: 1 }} />
              Confirm Delete
            </Fab>
          ) : (
            <>
              <Fab
                color="secondary"
                aria-label="delete-mode"
                onClick={() => setIsDeleting(true)}
                size="medium"
              >
                <DeleteIcon />
              </Fab>
              
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpenDialog(true)}
              >
                <AddIcon />
              </Fab>

              <Fab
                color="success"
                variant="extended"
                onClick={() => setConfDialog(true)}
              >
                <SaveIcon sx={{ mr: 1 }} />
                Save Changes
              </Fab>
            </>
          )}
           {isDeleting && (
             <Fab color="inherit" variant="extended" onClick={() => setIsDeleting(false)} size="small" sx={{mt: 1}}>
                Cancel
             </Fab>
           )}
        </Box>

        {/* Dialogs */}
        <Dialog open={confDialog} onClose={() => setConfDialog(false)}>
          <DialogTitle>
            {isDeleting ? "Delete selected items?" : "Save changes?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              color={isDeleting ? "error" : "primary"}
              onClick={() => {
                saveChanges();
                setConfDialog(false);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleAddConfirm}
              disabled={!newName.trim()}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
