import { ApiProperty } from '@nestjs/swagger';
export class FileDto {
  @ApiProperty()
  destination: string;

  @ApiProperty()
  encoding: string;

  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty({
    example: 'storage/images/filename.jpg',
  })
  path: string;

  @ApiProperty()
  size: number;
}
