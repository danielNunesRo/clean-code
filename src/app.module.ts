import { Module } from '@nestjs/common';
import { DatabaseService } from './shared/database/database.service';
import { UsuarioController } from './modules/Usuarios/controllers/usuario.controller';
import { UsuarioRepository } from './modules/Usuarios/repositories/usuario.repository';



@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [DatabaseService, UsuarioRepository],
})
export class AppModule {}
