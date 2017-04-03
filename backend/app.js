var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// DB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db'); // connect to our datab
var Note = require('./models/note');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

var port = process.env.PORT || 1322;
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to note api!' });
});

// Note router

router.route('/notes')
    .post(function(req, res) {
	console.log(req.body);
        var note = new Note();
        note.title = req.body.title;
        note.content= req.body.content;

        if(note.title || note.content) {
            note.save(function(err, note) {
                if(err) res.send(err);
                res.json({message: 'Note created!', id: note.id});
            });
        }
    })
    .get(function(req, res) {
        var keyword = req.query.keyword;
        if(keyword) {
            Note.find({$or: [{ content: {$regex: keyword} }, { title: {$regex: keyword} }]}, function(err, note) {
                if(err) res.status(404);
                res.json(note);
            });
        }else {
            Note.find(function(err, notes) {
                if(err) res.status(404);
                res.json(notes);
            });
        }
    });

router.route('/notes/:note_id')
    .get(function(req, res) {
        Note.findById(req.params.note_id, function(err, note) {
            if(err) res.status(404);
            res.json(note);
        });
    })
    .put(function(req, res) {
    	if(req.body || req.content) {
            Note.findById(req.params.note_id, function(err, note) {
           	   if (err) res.send(err);
           	   note.name = req.body.name;
           	   note.save(function(err) {
           	     if (err) res.send(err);
           	     res.json({
           	       message: 'Note updated!'
           	     })
           	   });
       	   });
        }
    })
    .delete(function(req, res) {
        Note.remove({
            _id: req.params.note_id
        }, function(err, note) {
            if(err) res.send(err);
            res.json({message: 'Delete successfully!'})
        })
    });

app.use('/api', router);

app.listen(port);
console.log('Server is on port: ' + port);
