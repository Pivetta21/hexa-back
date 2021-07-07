import { UpdateUserDto } from './../model/update-user.dto';
import { CreateUserDto } from './../model/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';

describe('UsersController', () => {
  let controller: UsersController;

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

  const mockUserService = {
    create: jest.fn().mockImplementation((dto: CreateUserDto) => {
      return { ...dto, id: Date.now() };
    }),
    findAll: jest.fn().mockImplementation((name?: string) => {
      if (name) {
        return mockUsers.filter((mockUser) => mockUser.name === name);
      }

      return mockUsers;
    }),
    findOne: jest.fn().mockImplementation((id: number) => {
      return mockUsers.find((mockUser) => mockUser.id === id);
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateUserDto) => {
      return { id, ...dto };
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      return mockUsers.filter((mockUser) => mockUser.id !== id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user and return the record', () => {
    const dto: CreateUserDto = {
      name: 'Lucas',
      email: 'lucas@email.com',
      isCreator: false,
      password: 'test001',
      pictureUrl: 'https://www.google.com.br/imghp',
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', () => {
    expect(controller.findAll()).toEqual(mockUsers);
  });

  it('should find all users with a specific name', () => {
    const name = 'Foo Bar';
    const mockUsersFilter = mockUsers.filter(
      (mockUser) => mockUser.name === name,
    );

    expect(controller.findAll(name)).toEqual(mockUsersFilter);
  });

  it('should find one user', () => {
    const id = 1;
    const mockUsersFind = mockUsers.find((mockUser) => mockUser.id === id);

    expect(controller.findOne(id)).toEqual(mockUsersFind);
  });

  it('should update a user', () => {
    const id = 1;
    const dto: UpdateUserDto = {
      email: 'lucas21@email.com',
      isCreator: true,
    };

    expect(controller.update(id, dto)).toEqual({
      id,
      ...dto,
    });

    expect(mockUserService.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a user', () => {
    const id = 1;
    const mockUsersFilter = mockUsers.filter((mockUser) => mockUser.id !== id);

    expect(controller.remove(id)).toEqual(mockUsersFilter);
  });
});
