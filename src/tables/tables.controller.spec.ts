import { Test, TestingModule } from '@nestjs/testing';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('TablesController', () => {
  let controller: TablesController;
  let tablesService: TablesService;
  let usersService: UsersService;

  const mockTablesService = {
    getTables: jest.fn().mockReturnValue([]),
    joinTable: jest.fn(),
    leaveTable: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
    getAllUsers: jest.fn().mockResolvedValue([]),
  };

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
      providers: [
        {
          provide: TablesService,
          useValue: mockTablesService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<TablesController>(TablesController);
    tablesService = module.get<TablesService>(TablesService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
