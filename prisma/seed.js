const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv/config');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Roles
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'admin' },
    update: {},
    create: {
      nombre: 'admin',
      descripcion: 'Administrador del sistema',
    },
  });

  const rolStudent = await prisma.rol.upsert({
    where: { nombre: 'estudiante' },
    update: {},
    create: {
      nombre: 'estudiante',
      descripcion: 'Estudiante del sistema',
    },
  });

  console.log('Roles created:', { admin: rolAdmin.id, estudiante: rolStudent.id });

  // 2. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.usuario.upsert({
    where: { correo: 'admin@enervida.bo' },
    update: {
      contrasena_hash: adminPassword
    },
    create: {
      rol_id: rolAdmin.id,
      nombres: 'Administrador',
      apellidos: 'Principal',
      correo: 'admin@enervida.bo',
      contrasena_hash: adminPassword,
      estado: 'ACTIVO',
      correo_verificado: true,
    },
  });

  console.log('Admin user created/updated:', adminUser.correo, 'Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
