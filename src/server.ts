import app from "./app";
import { environment } from "./config/environment";

app.listen(environment.port, () => {
  console.log(`Sport Ecommerce API is running on port ${environment.port}`);
});
