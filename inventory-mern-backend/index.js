const app = require("./app");
const PORT = process.env.PORT || 5050;

app.listen(PORT, function () {
    console.log(`App running successfully on port ${PORT}`);
});
