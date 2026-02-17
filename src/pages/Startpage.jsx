import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a1b9a 30%, #ff6f00 90%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
            Canteen System
          </Typography>
          
          <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
            Welcome to the modern dining experience.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mb: 2, py: 1.5, fontSize: "1.1rem" }}
            onClick={() => navigate("/user")}
          >
            Enter as User
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontSize: "1.1rem" }}
            onClick={() => navigate("/admin")}
          >
            Enter as Admin
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
