import { Test, TestingModule } from '@nestjs/testing';
import { GameLogicService } from './game-logic.service';
import { DecksService } from '../decks/decks.service';
import { PlayersService } from '../players/players.service';
import { ActionsService } from '../actions/actions.service';

describe('GameLogicService', () => {
  let service: GameLogicService;
  let decksService: DecksService;
  let playersService: PlayersService;
  let actionsService: ActionsService;

  const mockDecksService = {
    generateDeck: jest.fn().mockReturnValue([]),
    shuffleDeck: jest.fn(),
    dealCard: jest.fn(),
  };

  const mockPlayersService = {
    findPlayerById: jest.fn(),
    updatePlayer: jest.fn(),
    getAllPlayers: jest.fn().mockReturnValue([]),
  };

  const mockActionsService = {
    createAction: jest.fn(),
    getActionsForTable: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameLogicService,
        {
          provide: DecksService,
          useValue: mockDecksService,
        },
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
        {
          provide: ActionsService,
          useValue: mockActionsService,
        },
      ],
    }).compile();

    service = module.get<GameLogicService>(GameLogicService);
    decksService = module.get<DecksService>(DecksService);
    playersService = module.get<PlayersService>(PlayersService);
    actionsService = module.get<ActionsService>(ActionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
