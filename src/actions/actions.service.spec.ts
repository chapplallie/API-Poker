import { Test, TestingModule } from '@nestjs/testing';
import { ActionsService } from './actions.service';
import { PlayersService } from '../players/players.service';
import { TablesService } from '../tables/tables.service';

describe('ActionsService', () => {
  let service: ActionsService;
  let playersService: PlayersService;
  let tablesService: TablesService;

  const mockPlayersService = {
    findPlayerById: jest.fn(),
    updatePlayerChips: jest.fn(),
    getAllPlayers: jest.fn().mockReturnValue([]),
  };

  const mockTablesService = {
    findTableById: jest.fn(),
    updateTable: jest.fn(),
    tables: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionsService,
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
        {
          provide: TablesService,
          useValue: mockTablesService,
        },
      ],
    }).compile();

    service = module.get<ActionsService>(ActionsService);
    playersService = module.get<PlayersService>(PlayersService);
    tablesService = module.get<TablesService>(TablesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
