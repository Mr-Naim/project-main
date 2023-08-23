const app = require("./app");

// Use the dynamic port assigned by Vercel or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`App Running successfully on port ${PORT}`);
});
