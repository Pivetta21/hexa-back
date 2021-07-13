import { EmailConfirmation } from './../entities/email-confirmation.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(EmailConfirmation)
export class EmailConfirmationRepository extends Repository<EmailConfirmation> {}
