const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const enrollments = await prisma.curso.findMany({
      select: {
        titulo: true,
        _count: {
          select: { inscripciones: true }
        }
      },
      orderBy: {
        inscripciones: { _count: 'desc' }
      },
      take: 5
    });
    console.log("Success enrollments:", enrollments);

    const dashboard = await prisma.$transaction([
      prisma.curso.count(),
      prisma.usuario.count({ where: { rol: { nombre: 'ESTUDIANTE' } } }),
      prisma.inscripcion.count(),
      prisma.curso.aggregate({ _sum: { precio: true } })
    ]);
    console.log("Success dashboard:", dashboard);
  } catch (e) {
    console.error("Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
