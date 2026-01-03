import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const clientInfo = req.body;

    const connection = await pool.getConnection();

    // 1️⃣ Create table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS client_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2️⃣ Insert JSON data
    const [result] = await connection.query(
      `INSERT INTO client_info (data) VALUES (?)`,
      [JSON.stringify(clientInfo)]
    );

    connection.release();

    return res.status(200).json({
      success: true,
      insertedId: (result as any).insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
