import { EmailConfirmationDto } from './email-confirmation.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdatedEmailConfirmationDto extends PartialType(
  PickType(EmailConfirmationDto, ['code'] as const),
) {}
