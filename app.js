const express = require("express");
const path = require("path");
var genuuid = require("uuid").v4;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const app = express();
// Todo: add stripe key
const stripe = require("stripe")(
  "sk_test_51JMYvaSFCgqg44DgzDlBAxOsNZLaVhkQwIyNyFR5oLYCsSbLzSup1RZ067SZnA1W2uUfkRKiGVlF609TJ8eLTPih00Qy63iSHr"
);
app.use(cors());
app.use(express.json());
const api = require("./server/api");
const db = require("./server/db");

//Configure .env
require("dotenv").config();

//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;

//Initiate connection with database
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).then(() => {
  //Handle /api with the api middleware
  app.use(
    "/api",
    session({
      genid() {
        return genuuid(); // use UUIDs for session IDs
      },
      store: new MongoStore({ client: db.getClient() }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
    api
  );

  app.post("/api/payments", (req, res) => {
    const { product, token } = req.body;
    console.log(product);
    console.log(product.price);

    const idempotencyKey = genuuid();

    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email:token.email,
            description:product.name,
            shipping:{
              name:token.card.name,
              address:{
                country:token.card.address_country
              }
            }
          },
          { idempotencyKey }
        );
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  });

  //Handle non-api routes with static build folder
  app.use(express.static(path.join(__dirname, "build")));

  //Return index.html for routes not handled by build folder
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  //Start listening on port
  app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
  });
});
