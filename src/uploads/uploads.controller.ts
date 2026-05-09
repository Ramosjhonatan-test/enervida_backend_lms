import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {

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
}
