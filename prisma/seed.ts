import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sports = await prisma.sport.createMany({
    data: [
      {
        name: "Baseball",
      },
      {
        name: "Basketball",
      },
      {
        name: "Field Hockey",
      },
      {
        name: "Football",
      },
      {
        name: "Hockey",
      },
      {
        name: "Lacrosse",
      },
      {
        name: "Quidditch",
      },
      {
        name: "Rugby",
      },
      {
        name: "Soccer",
      },
      {
        name: "Softball",
      },
      {
        name: "Volleyball",
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
