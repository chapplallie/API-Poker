import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ActionsService } from '../actions/actions.service';
import { PlayersService } from '../players/players.service';
import { TablesService } from '../tables/tables.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [UsersService],
    // }).compile();
    const module: TestingModule = await Test.createTestingModule({
    providers: [
      ActionsService,
      {
        provide: PlayersService,
        useValue: {}// mockPlayersService, // ou simplement un objet vide `{}` si pas encore simulé
      },
      {
        provide: TablesService,
        useValue: {}, // mock ou service réel si nécessaire
      },
    ],
  }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
