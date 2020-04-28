import { Test, TestingModule } from '@nestjs/testing';
import { ColorMadecorController } from './color-madecor.controller';

describe('ColorMadecor Controller', () => {
  let controller: ColorMadecorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorMadecorController],
    }).compile();

    controller = module.get<ColorMadecorController>(ColorMadecorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
