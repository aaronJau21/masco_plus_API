import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { Request } from 'express';
import { ActivateMarcaDto } from './dto/activate-marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto, @Req() req: Request) {
    const user = req['user'];
    return this.marcaService.create(createMarcaDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.marcaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcaService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcaService.update(+id, updateMarcaDto);
  }

  @UseGuards(AuthGuard)
  @Patch('activate-brand/:id')
  activateBrand(
    @Param('id') id: string,
    @Body() activate: ActivateMarcaDto,
    @Req() req: Request,
  ) {
    return this.marcaService.activateBrand(+id, activate, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcaService.remove(+id);
  }
}
