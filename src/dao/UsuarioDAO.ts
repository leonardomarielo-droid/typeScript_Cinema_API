import { RowDataPacket, ResultSetHeader } from "mysql2";
import { MySQLDatabase } from "../database/MySQLDatabase"; import { Usuario } from "../models/Usuario";
export class UsuarioDAO { constructor(private db:MySQLDatabase){} private async pool(){return this.db.getPool();}
 async create(u:Usuario){const [r]=await (await this.pool()).execute<ResultSetHeader>("INSERT INTO Usuario (Usuario_nome,Usuario_email,Usuario_senha) VALUES (?,?,?)",[u.Usuario_nome,u.Usuario_email,u.Usuario_senha]);u.Usuario_id=r.insertId;return u;}
 async findAll():Promise<Usuario[]>{const [r]=await (await this.pool()).query<RowDataPacket[]>("SELECT Usuario_id,Usuario_nome,Usuario_email FROM Usuario ORDER BY Usuario_id");return r as Usuario[];}
 async findById(id:number):Promise<Usuario|null>{const [r]=await (await this.pool()).execute<RowDataPacket[]>("SELECT Usuario_id,Usuario_nome,Usuario_email FROM Usuario WHERE Usuario_id=?",[id]);return r.length?r[0] as Usuario:null;}
 async findByEmail(email:string):Promise<Usuario|null>{const [r]=await (await this.pool()).execute<RowDataPacket[]>("SELECT * FROM Usuario WHERE Usuario_email=?",[email]);return r.length?r[0] as Usuario:null;}
 async update(u:Usuario):Promise<boolean>{const [r]=await (await this.pool()).execute<ResultSetHeader>("UPDATE Usuario SET Usuario_nome=?,Usuario_email=?,Usuario_senha=IF(?='',Usuario_senha,?) WHERE Usuario_id=?",[u.Usuario_nome,u.Usuario_email,u.Usuario_senha,u.Usuario_senha,u.Usuario_id]);return r.affectedRows>0;}
 async delete(id:number):Promise<boolean>{const [r]=await (await this.pool()).execute<ResultSetHeader>("DELETE FROM Usuario WHERE Usuario_id=?",[id]);return r.affectedRows>0;}
}
