import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toSampleDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { SampleCreateDto, SampleDto } from './dto/sample.dto';
import { Sample } from './entity/sample.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepo: Repository<Sample>,
  ) {}

  async getAllSample(): Promise<SampleDto[]> {
    const sampleList = (await this.sampleRepo.find()).map((x) =>
      toSampleDto(x),
    );

    return toPromise(sampleList);
  }

  async getOnesample(id: string): Promise<SampleDto> {
    const sample = await this.sampleRepo.findOne({ where: { id } });

    if (!sample) {
      throw new HttpException(
        `sample item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toSampleDto(sample));
  }
  async createsample(sampleDto: SampleCreateDto): Promise<SampleDto> {
    const { name, description } = sampleDto;

    const sample: Sample = {
      id: uuid.v4(),
      name,
      description,
    };

    const newSample = await this.sampleRepo.create(sample);
    const result = await this.sampleRepo.save(newSample);
    return toPromise(toSampleDto(result));
  }

  async updatesample(id: string, sampleUpdate: SampleDto): Promise<SampleDto> {
    let sample = await this.getOnesample(id);

    sample = sampleUpdate;
    const result = await this.sampleRepo.save(sample);
    return toPromise(toSampleDto(result));
  }

  async destorysample(id: string): Promise<boolean> {
    const sample = await this.getOnesample(id);
    const result = await this.sampleRepo.delete(sample);
    return result.affected > 0;
  }
}
