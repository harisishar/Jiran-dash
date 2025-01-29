import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: 'postgresql://jiran:OIdjVxKzGqK58hPT8nUiXjQlS2i9UplX@dpg-cub3rrrqf0us73ccgbd0-a.singapore-postgres.render.com/jiran',
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM masteruser');
    return NextResponse.json(res.rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error connecting to the database:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch users from the database', details: errorMessage },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
} 