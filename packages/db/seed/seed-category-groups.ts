/** biome-ignore-all lint/suspicious/noConsole: <Is seed script> */
import "dotenv/config";
import slugify from "slugify";
import { db } from "@/index";
import { categoryGroups } from "@/schema";

const categoryGroupsSeed = [
  {
    name: "Equipos",
  },
  {
    name: "Componentes",
  },
  {
    name: "Periféricos",
  },
  {
    name: "Productos",
  },
];

async function seedCategoryGroups() {
  console.log("[i] Insertando Grupos de categorias...");

  try {
    const data = categoryGroupsSeed.map((categoryGroup) => ({
      name: categoryGroup.name,
      slug: slugify(categoryGroup.name, { lower: true }),
    }));

    await db.insert(categoryGroups).values(data).onConflictDoNothing();

    console.log(`[+] ${data.length} grupos de categorías procesadas.`);
  } catch (error) {
    console.error("[!] Error al insertar grupos de categorías:", error);
    throw error;
  }
}

async function main() {
  console.log("[i] Iniciando seed...");
  await seedCategoryGroups();
  console.log("[+] Seed finalizado.");

  await db.$client.end();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[!] Falló el seed:", error);
    process.exit(1);
  });
