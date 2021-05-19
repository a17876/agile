const app = require("./index").app;

app.listen(4200, () =>{
    console.log(
        "Server running. Visit: http://localhost:4200/ in your browser"
    );
});