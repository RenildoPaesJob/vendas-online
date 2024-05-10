import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

type NotificationDTO = {
	email: string,
	startAt: Date,
	endAt: Date,
	name: string,
	title: string,
	description: string
}

@Controller()
export class AppController {

  constructor(
		private mailerService: MailerService
	) {}

	@EventPattern("task_notification")
	async taskNotification(data: NotificationDTO){
		console.log("Recebendo mensagem: ", data);

		await this.mailerService.sendMail({
			to: data.email,
			from: "taskmanager@nestjscurso.com.br",
			text: `Olá ${data.name} você tem atividade ${data.title} que inicia ${data.startAt} e finaliza em ${data.endAt}`
		})
	}
}