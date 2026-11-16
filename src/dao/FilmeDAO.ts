import { RowDataPacket,ResultSetHeader } from "mysql2"; import {MySQLDatabase} from "../database/MySQLDatabase"; import {Filme} from "../models/Filme";
export class FilmeDAO {constructor(private db:MySQLDatabase){} private async pool(){return this.db.getPool();}
 async create(f:Filme){const [r]=await (await this.pool()).execute<ResultSetHeader>("INSERT INTO Filme (Filme_titulo,Filme_duracao) VALUES (?,?)",[f.Filme_titulo,f.Filme_duracao]);f.Filme_id=r.insertId;return f;}
 async findAll():Promise<Filme[]>{const [r]=await (await this.pool()).query<RowDataPacket[]>("SELECT * FROM Filme ORDER BY Filme_id");return r as Filme[];}
 async findById(id:number):Promise<Filme|null>{const [r]=await (await this.pool()).execute<RowDataPacket[]>("SELECT * FROM Filme WHERE Filme_id=?",[id]);return r.length?r[0] as Filme:null;}
 async update(f:Filme):Promise<boolean>{const [r]=await (await this.pool()).execute<ResultSetHeader>("UPDATE Filme SET Filme_titulo=?,Filme_duracao=? WHERE Filme_id=?",[f.Filme_titulo,f.Filme_duracao,f.Filme_id]);return r.affectedRows>0;}
 async delete(id:number):Promise<boolean>{const [r]=await (await this.pool()).execute<ResultSetHeader>("DELETE FROM Filme WHERE Filme_id=?",[id]);return r.affectedRows>0;}
}
