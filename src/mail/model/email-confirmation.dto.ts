import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, Max, Min } from 'class-validator';

export class EmailConfirmationDto {
  @IsInt()
  @Min(1000)
  @Max(9999)
  @ApiProperty({ example: 1057 })
  code: number;

  @IsDate()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  expirationDate: string;
}
