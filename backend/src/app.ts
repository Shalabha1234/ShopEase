import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderHistoryRoutes from "./routes/orderHistoryRoutes";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🚀 ShopEase Backend Running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/my-orders", orderHistoryRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

export default app;