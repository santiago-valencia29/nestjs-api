import { Test, TestingModule } from '@nestjs/testing';
import { FerreteriaController } from './ferreteria.controller';

describe('Ferreteria Controller', () => {
  let controller: FerreteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FerreteriaController],
    }).compile();

    controller = module.get<FerreteriaController>(FerreteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
