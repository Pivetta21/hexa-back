import { CreateUserDto } from './../src/api/users/model/create-user.dto';
import { User } from '../src/entities/user.entity';
import { UsersModule } from '../src/api/users/users.module';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/api/users/model/update-user.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      id: 1,
      permission: 3,
      name: 'Foo Bar',
      email: 'email@email.com',
      pictureUrl: 'https://www.google.com.br/imghp',
      signUpDate: '2021-07-05 00:26:06.399+00',
      isCreator: false,
    },
    {
      id: 2,
      permission: 3,
      name: 'Bar Foo',
      email: 'email@email.com.br',
      pictureUrl: 'https://www.google.com.br/imghp',
      signUpDate: '2021-07-05 00:26:06.399+00',
      isCreator: false,
    },
  ];

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation((dto: CreateUserDto) => dto),
    save: jest
      .fn()
      .mockImplementation((user: User) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    findOne: jest.fn().mockImplementation((id: string) => {
      return mockUsers.find((mockUser) => mockUser.id === Number(id));
    }),
    update: jest.fn().mockImplementation((id: string, dto: UpdateUserDto) => {
      const findUser = mockUsers.find((mockUser) => mockUser.id === Number(id));

      return { findUser, ...dto };
    }),
    delete: jest.fn().mockImplementation((id: string) => {
      mockUsers.filter((mockUser) => mockUser.id !== Number(id));
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it(`/POST user`, () => {
    const mockNewUser = {
      permission: 3,
      name: 'Mock Foo',
      email: 'mock@email.com.br',
      pictureUrl: 'https://www.google.com.br/imghp',
      isCreator: false,
      password: 'test001',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(mockNewUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...mockNewUser });
      });
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(mockUsers);
      });
  });

  it(`/GET:id users`, () => {
    const id = 1;
    const user = mockUsers.find((mockUser) => mockUser.id === id);

    return request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(user);
      });
  });

  it(`/PATCH/:id users`, () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ name: 'Test Foo PATCH' })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual('Test Foo PATCH');
      });
  });

  it(`/DELETE/:id users`, () => {
    const id = 2;
    const user = mockUsers.find((mockUser) => mockUser.id === id);

    return request(app.getHttpServer())
      .delete('/users/2')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(user);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
