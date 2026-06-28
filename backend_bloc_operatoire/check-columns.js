const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkColumns() {
  try {
    await client.connect();
    console.log('✅ Connecté à PostgreSQL sur Render\n');

    const res = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'notifications_cpa'
      ORDER BY ordinal_position
    `);

    console.log('📋 Colonnes de notifications_cpa :');
    res.rows.forEach(row => console.log(' -', row.column_name, ':', row.data_type));
    console.log(`\n✅ Total : ${res.rows.length} colonnes`);

    await client.end();
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

checkColumns();
