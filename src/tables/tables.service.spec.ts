import { Test, TestingModule } from '@nestjs/testing';
import { TablesService } from './tables.service';
import { GameLogicService } from '../game-logic/game-logic.service';

describe('TablesService', () => {
  let service: TablesService;
  let gameLogicService: GameLogicService;

  const mockGameLogicService = {
    shuffleDeck: jest.fn(),
    dealCards: jest.fn(),
    evaluateHand: jest.fn(),
    determineWinner: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TablesService,
        {
          provide: GameLogicService,
          useValue: mockGameLogicService,
        },
      ],
    }).compile();

    service = module.get<TablesService>(TablesService);
    gameLogicService = module.get<GameLogicService>(GameLogicService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have initial tables', () => {
    expect(service.tables).toBeDefined();
    expect(service.tables.length).toBeGreaterThan(0);
  });
});
