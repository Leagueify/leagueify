import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sports = await prisma.sport.createMany({
    data: [
      {
        name: "Hockey",
      },
    ],
    skipDuplicates: true,
  });
  console.log({ sports });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
