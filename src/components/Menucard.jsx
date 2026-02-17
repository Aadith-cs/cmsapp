import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

export default function MenuCard({ item, onOrder }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={
          item.image ||
          "https://placehold.co/600x400/e0e0e0/ffffff?text=Food+Item"
        }
        alt={item.name}
        sx={{ filter: item.available ? "none" : "grayscale(100%)" }}
      />
      
      {!item.available && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Chip label="Unavailable" color="error" variant="filled" size="medium" />
        </Box>
      )}

      <CardContent sx={{ position: "relative", zIndex: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="h6" color="secondary" fontWeight="bold">
            ₹{item.price}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!item.available}
          onClick={() => onOrder && onOrder(item)}
          sx={{ mt: 2, borderRadius: 2, py: 1 }}
        >
          {item.available ? "Add to Order" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
}
