import mysql, { Pool, QueryResult, ResultSetHeader, RowDataPacket, } from "mysql2/promise";

import { environment } from "./environment";

export const databasePool: Pool = mysql.createPool({
  host: environment.databaseHost,
  port: environment.databasePort,
  user: environment.databaseUser,
  password: environment.databasePassword,
  database: environment.databaseName,
  connectionLimit: environment.databaseConnectionLimit,
  waitForConnections: true,
  queueLimit: 0,
});

export const connectDatabase = async (): Promise<void> => {
  const connection = await databasePool.getConnection();

  try {
    await connection.ping();
    console.log(`MySQL connected: ${environment.databaseHost}:${environment.databasePort}/${environment.databaseName}`);
  } finally {
    connection.release();
  }
};

export const closeDatabase = async (): Promise<void> => {
  await databasePool.end();
};

export const executeQuery = async <T extends QueryResult = RowDataPacket[]>(
  sql: string,
  params: any[] = [],
): Promise<T> => {
  const connection = await databasePool.getConnection();

  try {
    const [rows] = await connection.execute(sql, params);
    return rows as T;
  } finally {
    connection.release();
  }
};

export type QueryRows = RowDataPacket[];
export type QueryWriteResult = ResultSetHeader;