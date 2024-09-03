import {prisma} from "./prisma.js";

async function main() {
    console.log("🌱 Start seeding...");

    await prisma.shop.create({
        data: {
            name: 'Best shop',
        }
    });

    console.log("🌾 Finish seeding...");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });