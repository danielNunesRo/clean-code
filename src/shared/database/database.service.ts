import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as oracledb from 'oracledb'

export class DatabaseService implements OnModuleInit, OnModuleDestroy{

    private connection: oracledb.Connection;

    async onModuleInit() {
        try {
            this.connection = await oracledb.getConnection({
                user: 'system',
                password: '123',
                connectString: 'localhost:1521/FREEPDB1',
            })

            console.log("Conectado ao OracleDB")


        } catch (error) {
            console.error("Erro ao se conectar ao OracleDB: ", error);
            throw error;
        }
    }

    async query<T>(sql: string, binds: { [key: string]: any } = {}): Promise<T> {
        try {
            const result = await this.connection.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows as T;
        } catch (error) {
            console.error("Erro ao executar a query: ", error);
            throw error;
        }
    }


    async onModuleDestroy() {
        try {
          await this.connection.close();
          console.log('Conexão ao OracleDB fechada');
        } catch (error) {
          console.error('Erro ao fechar conexão com OracleDB', error);
        }
      }
}