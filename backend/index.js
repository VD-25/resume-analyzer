const cors = require("cors");
const express = require("express");
const swaggerDocs = require('./config/swaggerConfig');

const apiRoutes = require("./routes/apiRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

swaggerDocs(app);

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
