const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDeleteMany() {
  try {
    // Intentar borrar con filtro anidado (esto suele fallar en deleteMany)
    const result = await prisma.progresoLeccion.deleteMany({
      where: {
        usuario_id: 1, // Cambiar por uno real si es necesario, o solo probar sintaxis
        leccion: { modulo: { curso_id: 1 } }
      }
    });
    console.log('Result:', result);
  } catch (error) {
    console.error('Error in deleteMany:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDeleteMany();
