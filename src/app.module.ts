import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: "smtp.ethereal.email",
				port: 587,
				secure: false,
				auth: {
					user: 'avery.schmeler@ethereal.email',
					pass: '2sR9DKuXQsmmKHYJDB'
				}
			}
		})
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule { }
