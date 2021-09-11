const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 8080;

const app = require("./config/app")(express);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, console.log(`Serveur démarré sur ${PORT}`));