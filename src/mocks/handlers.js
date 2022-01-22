import { rest } from 'msw';
import { usersList } from './users';

// function setCookie(name, value, days) {
//   var expires = '';
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = '; expires=' + date.toUTCString();
//   }
//   document.cookie = name + '=' + (value || '') + expires + '; path=/;';
// }

const authToken = 'abc-123';

export const handlers = [
  //Let’s create mock of API for sign-in where users can get authenticated by passing
  // the username and password. On successful authentication, we will return the access
  //token and expiry time along with the user details.

  rest.post('http://localhost:3000/users/signin', (req, res, ctx) => {
    const user = req.body.username;
    const password = req.body.password;

    // return 400 status if username/password is not exist
    if (!user || !password) {
      return res(ctx.status(400, 'Username and Password required.'));
    }

    const userData = usersList.find((x) => x.name === user.value && x.password === password);

    // return 401 status if the credential is not matched
    if (!userData) {
      return res(ctx.status(401, 'Username or Password is Wrong.'));
    }

    // Cause we can't set secure cookies from client side,
    // we need extra server to set them for us
    fetch(`http://localhost:3000/api/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    // finally we return to user auth-token
    return res(
      ctx.status(200),
      ctx.json({ userName: userData.name }),
      ctx.set('auth-token', authToken)
    );
  })

  // rest.get('http://localhost:8080/verifyToken', (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       token: jwt, user: 'authUser'
  //     }),
  //   )
  // }),
];
