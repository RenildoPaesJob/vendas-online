import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { IStorage } from "./storage";
import { FileDTO } from "src/dto/user/users.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupabaseStorage implements IStorage {
	private client: SupabaseClient

	constructor() {
		this.client = createClient(
			process.env.SUPABASE_URL ?? '', //variaveis no .env
			process.env.SUPABASE_KEY ?? ''
		)
	}

	async upload(file: FileDTO, folder: string): Promise<any> {
		const data = await this.client
			.storage
			.from(process.env.SUPABASE_BUCKET ?? '')
			.upload(`${folder}/${file.originalname}`, file.buffer, {
				upsert: true// sobreescreve se ja existir
			})

		return data
	}
}