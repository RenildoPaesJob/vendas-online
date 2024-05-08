import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("/notification")
export class NotificationController {

	constructor(
		@Inject("NOTIFICATION") private readonly notificationClient: ClientProxy
	){}

	@Get("/send-notification")
	testMsNotification(){
		//enviar mensagem para o eventPattern "task_notification"
		this.notificationClient.emit("task_notification", "olá")
	}
}