import { CreateUserDto } from './../model/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../../entities/user.entity';

import { UsersService } from './users.service';
import { UpdateUserDto } from '../model/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

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
    create: jest.fn().mockImplementation((dto: CreateUserDto) => dto),
    save: jest
      .fn()
      .mockImplementation((user: User) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    find: jest.fn().mockImplementation((options) => {
      const name = options.where?.name;

      if (name) {
        return mockUsers.filter((mockUser) => mockUser.name === name);
      }

      return mockUsers;
    }),
    findOne: jest.fn().mockImplementation((id: number) => {
      return mockUsers.find((mockUser) => mockUser.id === id);
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateUserDto) => {
      const user = mockUsers.find((mockUser) => mockUser.id === id);

      return { user, ...dto };
    }),
    delete: jest
      .fn()
      .mockImplementation((id: number) =>
        mockUsers.filter((mockUser) => mockUser.id !== id),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return the record', async () => {
    const dto: CreateUserDto = {
      email: 'email452@email.com',
      isCreator: false,
      name: 'Ant Rock',
      password: 'test001',
      pictureUrl: 'https://www.google.com.br/imghp',
    };

    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should find all users', () => {
    expect(service.findAll()).toEqual(mockUsers);
  });

  it('should find all users with a specific name', () => {
    const name = 'Foo Bar';
    const mockUsersFilter = mockUsers.filter(
      (mockUser) => mockUser.name === name,
    );

    expect(service.findAll(name)).toEqual(mockUsersFilter);
  });

  it('should find one user', () => {
    const id = 1;
    const mockUsersFind = mockUsers.find((mockUser) => mockUser.id === id);

    expect(service.findOne(id)).toEqual(mockUsersFind);
  });

  it('should update a user ', () => {
    const id = 1;
    const user = mockUsers.find((mockUser) => mockUser.id === id);
    const dto = { name: 'Test Foo' };

    expect(service.update(id, dto)).toEqual({
      user,
      ...dto,
    });
  });

  it('should remove a user', () => {
    const id = 1;
    const users = mockUsers.filter((mockUser) => mockUser.id !== id);

    expect(service.remove(id)).toEqual(users);
  });
});
