import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	//criando a documentação com o Swagger,
	//setando o title, descrição, versao, autenticação,
	const config = new DocumentBuilder()
	.setTitle("API Task Manager")
	.setDescription("API responsável pelo o gerenciamento de tarefas de um usuário!")
	.setVersion("1.0")
	.addBearerAuth()
	.build()

	const document = SwaggerModule.createDocument(app, config)//momento em que é feito a configuraçao da documentaçao
	SwaggerModule.setup("docs", app, document)//setando a url "docs", para acessar a documentaçao da aplicação

  await app.listen(3000);
}
bootstrap();