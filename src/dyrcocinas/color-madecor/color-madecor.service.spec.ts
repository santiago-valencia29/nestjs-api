import { Test, TestingModule } from '@nestjs/testing';
import { ColorMadecorService } from './color-madecor.service';

describe('ColorMadecorService', () => {
  let service: ColorMadecorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorMadecorService],
    }).compile();

    service = module.get<ColorMadecorService>(ColorMadecorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
