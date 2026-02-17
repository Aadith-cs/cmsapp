import { Typography, Container, Grid, Card, CardActionArea, CardContent, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function AdminHome() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Update Menu",
      icon: <RestaurantMenuIcon sx={{ fontSize: 60, color: "primary.main" }} />,
      path: "/updatemenu", // Corrected path casing to match App.jsx route
      description: "Add, edit, or remove menu items"
    },
    {
      title: "View Orders",
      icon: <ReceiptIcon sx={{ fontSize: 60, color: "secondary.main" }} />,
      path: "#", // Placeholder
      description: "Check recent orders and status"
    },
    {
      title: "Manage Earnings",
      icon: <AttachMoneyIcon sx={{ fontSize: 60, color: "success.main" }} />,
      path: "#", // Placeholder
      description: "Track daily and monthly revenue"
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                <CardActionArea 
                  onClick={() => action.path !== "#" && navigate(action.path)}
                  sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                >
                  <Box mb={2}>
                    {action.icon}
                  </Box>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
