import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    const plantilla = await prisma.certificadoPlantilla.findFirst({
      where: { id: 3 },
      include: { curso: true }
    });
    console.log('Plantilla 3:', JSON.stringify(plantilla, null, 2));
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
