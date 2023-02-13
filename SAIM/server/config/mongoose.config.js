const mongoose = require('mongoose');
// require('dotenv').config();
mongoose.connect("mongodb://127.0.0.1:27017/SAIM", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Something went wrong", err))

// const mongoose = require("mongoose");
// require('dotenv').config()


// async function dbConnect() {
//   const DB_URL = "mongodb+srv://mtvdoan:I10v3413x@cluster0.havkg6w.mongodb.net/?retryWrites=true&w=majority";
//   // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/SAIM",
//         process.env.DB_URL,
//       {
//         //   these are options to ensure that the connection is done properly
//         useNewUrlParser: true,RS

//         useUnifiedTopology: true,
//         autoIndex: true
//       }
//     )
//     .then(() => {
//       console.log("Successfully connected to MongoDB Atlas!");
//     })
//     .catch((error) => {
//       console.log("Unable to connect to MongoDB Atlas!");
//       console.error(error);
//     });
// }

// module.exports =dbConnect;