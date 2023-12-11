import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { SampleListDto } from './dto/listSample.dto';
import { SampleCreateDto, SampleDto } from './dto/sample.dto';
import { SampleService } from './sample.service';

@Controller('api/sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}
  @Get()
  async findAll(): Promise<SampleListDto> {
    const samples = await this.sampleService.getAllSample();
    return toPromise({ samples });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SampleDto> {
    return await this.sampleService.getOnesample(id);
  }

  @Post()
  async create(@Body() sampleCreateDto: SampleCreateDto): Promise<SampleDto> {
    return await this.sampleService.createsample(sampleCreateDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() sampleDto: SampleDto,
  ): Promise<SampleDto> {
    return await this.sampleService.updatesample(id, sampleDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<boolean> {
    return await this.sampleService.destorysample(id);
  }
}
