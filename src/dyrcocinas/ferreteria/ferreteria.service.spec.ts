import { Test, TestingModule } from '@nestjs/testing';
import { FerreteriaService } from './ferreteria.service';

describe('FerreteriaService', () => {
  let service: FerreteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FerreteriaService],
    }).compile();

    service = module.get<FerreteriaService>(FerreteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
