import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/database.service";


@Injectable()
export class UsuarioRepository {

    private db: DatabaseService

    constructor(dataBaseService: DatabaseService) {
        this.db = dataBaseService;
    }

    async getAll() {
        const sql = 'SELECT * FROM RESTAURANTE.PRATO';
        const result = this.db.query(sql);
        return result;
    }

    async getPratoByName(nome: string): Promise<{nome, descricao, price}[] | any> {
        const sql = 'SELECT NOME, PRECO FROM RESTAURANTE.PRATO WHERE NOME = :NOME';
        const binds = {
            nome: nome
        }

        const result = await this.db.query(sql, binds);
        return result;

    }

    async createPrato(nome: string, preco: number, descricao: string): Promise<{message: string}> {
        const sql = 
        'INSERT INTO RESTAURANTE.PRATO (NOME, PRECO, DESCRICAO) VALUES (:NOME, :PRECO, :DESCRICAO)';
        
        const binds = {
            nome: nome,
            preco: preco,
            descricao: descricao
        };
        
        try {
            await this.db.query(sql, binds);
            return { message: 'Prato criado com sucesso!' };
        } catch (error) {
            console.error("Erro ao criar prato: ", error);
            throw error;
        }
    }
    
}