var express = require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);

router.get("/problems", function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get("/problems/:id", function (req, res) {
    var id = req.params.id;
    console.log("get id:" + id);
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post("/problems", function (req, res) {
    console.log("request@problem" + JSON.stringify(req.body));
    problemService.addProblem(req.body)
        .then(function (problem) {
            res.json(problem);
        }, function (error) {
            res.status(400).send("Problem name already exists!");
        });
});

// router.post('/lala', function(req, res){
//     console.log('lala ' + JSON.stringify(req.body));
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('thanks');
// });

module.exports = router;
