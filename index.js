var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

var app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); //Use body-parser to Parse POST Requests
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//Posting the form to /api/fileanalyse and get metadata
const upload = multer({ dest: 'uploads/' });  //Set file Storage location 
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.file) {
    return res.send('Please select an image to upload');
  }
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});



/*
//File Storage location 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Posting the form to /api/fileanalyse and get metadata
app.post('/api/fileanalyse', (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage}).single('upfile');

  upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
      console.log(req.file);
      console.log(req.body);
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
      res.json({body: req.body, name: req.file});
  });
});
*/
