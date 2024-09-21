import { Controller, Get, Injectable, Post, Query } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/database.service";
import { UsuarioRepository } from "../repositories/usuario.repository";


@Injectable()
@Controller("/api")
export class UsuarioController {

    private repository: UsuarioRepository 

    constructor(usuarioRepository: UsuarioRepository) {
        this.repository = usuarioRepository;
    }


    @Get("/all")
    async getAll() {
        return await this.repository.getAll();
    }

    @Get("/byName")
    async getByName(@Query() {nome}: {nome: string}): Promise<{nome, preco}[]> {
        return await this.repository.getPratoByName(nome);
    }



    @Post('/create-prato')
    async function(@Query() {nome, preco, descricao}: {nome: string, preco: number, descricao: string}): Promise<{message: string}> {
        const pratoExists = await this.repository.getPratoByName(nome);
        if(pratoExists) {
            console.error("O prato já existe no cardapio!")
            throw Error('O prato já existe no cardapio');
        }
        
        return await this.repository.createPrato(nome, preco, descricao);
    }

    // @Post("/create")
    // async createUser(@Query() {nameuser, email}: { nameuser: string; email: string })  {
    //     try {
    //         console.log(nameuser)
    //         console.log(email)
    //        return await this.repository.createUser(nameuser, email);
    //     } catch (error) {
    //         console.error("Erro ao salvar um novo usuario", error);
    //         throw error;
    //     }
    // }

    

}