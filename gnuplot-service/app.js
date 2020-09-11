const express = require("express");
const body_parser = require("body-parser");
const gnuplot = require("gnuplot");

// Alusta express-sovellus
const app = express();

// Lisää parserit POST-kutsun JSON-muotoiselle bodylle
// ja GET query parametreille
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

// Käsittelijä POST-kutsulle, jossa JSON-muotoinen data
app.post("/", (req, res, next) => {
    const formula = req.body.formula;

    // Plottaa png-kuva
    gnuplot()
        .set("term png")
        .unset("output")
        .plot(formula, {end: true})
        .pipe(res);

    console.log(formula);
    res.send("ok");
});

// Kuuntele porttia 80
app.listen(8080);