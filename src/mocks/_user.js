import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import { USER_LIST } from './assets';

const signin = rest.post('/api/auth/login', async (req, res, ctx) => {
  const { username, password } = await req.json();

  const user = USER_LIST.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return res(
      ctx.json({
        status: 10001,
        message: 'Incorrect username or password.',
      })
    );
  }

  return res(
    ctx.json({
      status: 0,
      message: '',
      data: {
        user,
        accessToken: faker.string.uuid(),
        refreshToken: faker.string.uuid(),
      },
    })
  );
});

const userList = rest.get('api/user', async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json(
      Array.from({ length: 10 }).map(() => ({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
      }))
    )
  );
});

export default [signin, userList];
