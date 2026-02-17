import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Alert,
  Paper,
  Divider,
  Collapse
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9876543210"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setEditMode(false);
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 4 }}>
      <Navbar isProfilePage={true} />
      
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                fontSize: "2.5rem",
                mb: 2,
                boxShadow: 2,
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {editMode ? "Edit Profile" : "My Profile"}
            </Typography>
            {!editMode && (
              <Typography variant="body1" color="text.secondary">
                Manage your personal details
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Collapse in={showAlert}>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Profile updated successfully!
            </Alert>
          </Collapse>

          {!editMode ? (
            <Box>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="h6">{user.name}</Typography>
              </Box>
              
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="h6">{user.email}</Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="h6">{user.phone}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setEditMode(true)}
                sx={{ borderRadius: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          ) : (
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />

              <Box mt={4} display="flex" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => setEditMode(false)}
                  sx={{ borderRadius: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={saveProfile}
                  sx={{ borderRadius: 2 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
        
        <Box textAlign="center" mt={4}>
          <Typography variant="caption" color="text.secondary">
            Need help? Contact us at cmsapp@gmail.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
