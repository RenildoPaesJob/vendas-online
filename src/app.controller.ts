import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

	@EventPattern("task_notification")
	taskNotification(data: any){
		console.log("Recebendo mensagem: ", data);
	}

	@EventPattern("task_notification")
	taskNotification2(data: any){
		console.log("Recebendo mensagem 2: ", data);
	}
}
