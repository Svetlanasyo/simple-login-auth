let express = require('express');
let app = express();
const cookieParser = require('cookie-parser');
const { usersList } = require('./users');

// setup json parsing
app.use(express.json());

// setup cookie parsing
app.use(cookieParser());

// endpoint to setup for us secure cookie
app.post('/api/users/signin', function (req, res) {
  const user = req.body;

  res.cookie('X-CSRF-TOKEN', user.csrfToken, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 900000)
  });

  res.send();
});

// endpoint to retrive cookies also those secured
app.get('/api/cookies', function (req, res) {
  const xcsrfToken = req.headers['X-CSRF-TOKEN'];

  // check if xcsrf token is present
  if (!xcsrfToken) {
     // if not authorized return  Unauthorized code
    res.status(401);
  }

  // we also check if the token is valid
  const isXcsrfTokenValid = usersList.find((user) => user.csrfToken == xcsrfToken) > 0;
  if (!isXcsrfTokenValid) {
    // if not authorized return  Unauthorized code
    res.status(401);
  }

  // return cookies as json
  res.json(req.cookies);
});

// run server
app.listen(3001, function () {
  console.log('Server started on port: 3001');
});
