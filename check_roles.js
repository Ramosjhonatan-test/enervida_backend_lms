const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const roles = await prisma.rol.findMany()
  console.log('Roles en DB:', JSON.stringify(roles, null, 2))
  
  const usuariosCount = await prisma.usuario.count()
  console.log('Total usuarios:', usuariosCount)
  
  const usuariosPorRol = await prisma.usuario.groupBy({
    by: ['rol_id'],
    _count: true
  })
  console.log('Usuarios por Rol ID:', JSON.stringify(usuariosPorRol, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
