import mysql, { Pool, PoolOptions } from "mysql2/promise";
import { createLogger } from "../logging/Logger";
const log = createLogger("MySQLDatabase");
export class MySQLDatabase {
  private static pool: Pool | null = null;
  private config: PoolOptions;
  constructor(config: PoolOptions = {}) { this.config = {host:process.env.DB_HOST||"localhost",port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",database:process.env.DB_NAME||"Cinema",waitForConnections:true,connectionLimit:Number(process.env.DB_CONNECTION_LIMIT||10),queueLimit:0,charset:"utf8mb4",...config}; }
  async getPool(): Promise<Pool> { if (!MySQLDatabase.pool) { const pool=mysql.createPool(this.config); try { await pool.query("SELECT 1"); MySQLDatabase.pool=pool; log.info("conectado ao MySQL"); } catch(e) { await pool.end(); throw e; } } return MySQLDatabase.pool; }
  async close(): Promise<void> { if(MySQLDatabase.pool){await MySQLDatabase.pool.end();MySQLDatabase.pool=null;} }
}
