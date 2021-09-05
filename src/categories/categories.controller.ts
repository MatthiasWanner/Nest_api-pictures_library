import * as common from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

//TODO: type all returns
@ApiTags('Categories')
@common.Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({ type: Category })
  @common.Post()
  async create(@common.Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOkResponse({ type: [Category] })
  @common.Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      return error;
    }
  }

  @ApiOkResponse({ type: Category })
  @common.Get(':id')
  async findOne(@common.Param('id') id: string) {
    try {
      return await this.categoriesService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @ApiOkResponse({ type: Category })
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.update(id, updateCategoryDto);
    } catch (error) {
      return error;
    }
  }

  @ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  @common.HttpCode(common.HttpStatus.NO_CONTENT)
  async remove(@common.Param('id') id: string) {
    try {
      await this.categoriesService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
