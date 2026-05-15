import { Controller, Post, Get, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiOperation({ summary: 'Sube un archivo (imagen, video, pdf)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    }),
    limits: {
      fileSize: 900 * 1024 * 1024, // 900 MB max
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Archivo no subido');
    }
    
    // Devolvemos la ruta relativa para acceder estáticamente
    const fileUrl = `/uploads/${file.filename}`;
    return {
      message: 'Archivo subido con éxito',
      url: fileUrl,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  @Get('admin/list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Lista todos los archivos subidos y su estado de uso (Admin)' })
  findAll() {
    return this.uploadsService.findAll();
  }

  @Delete('admin/:filename')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Elimina un archivo del servidor (Admin)' })
  remove(@Param('filename') filename: string) {
    return this.uploadsService.deleteFile(filename);
  }

  @Post('admin/bulk-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Elimina múltiples archivos del servidor (Admin)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        filenames: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  removeBulk(@Body('filenames') filenames: string[]) {
    if (!filenames || !Array.isArray(filenames)) {
      throw new BadRequestException('Se requiere una lista de nombres de archivo');
    }
    return this.uploadsService.deleteBulk(filenames);
  }
}
