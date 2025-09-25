/** biome-ignore-all lint/suspicious/noConsole: <Is seed script> */
import "dotenv/config";
import slugify from "slugify";
import { db } from "@/index";
import { categories } from "@/schema";

const categoriesSeed = [
  {
    name: "Computadoras",
    categoryGroupId: 1,
  },
  {
    name: "Laptops",
    categoryGroupId: 1,
  },
  {
    name: "Impresoras",
    categoryGroupId: 1,
  },
  {
    name: "Sillas Gamer",
    categoryGroupId: 1,
  },
  {
    name: "Monitores",
    categoryGroupId: 1,
  },
  {
    name: "All in One",
    categoryGroupId: 1,
  },
  {
    name: "Proyectores",
    categoryGroupId: 1,
  },
  {
    name: "Tablets",
    categoryGroupId: 1,
  },
  {
    name: "Puntos de venta",
    categoryGroupId: 1,
  },
  {
    name: "Procesadores",
    categoryGroupId: 2,
  },
  {
    name: "Placas Madre",
    categoryGroupId: 2,
  },
  {
    name: "Memorias RAM",
    categoryGroupId: 2,
  },
  {
    name: "Almacenamiento",
    categoryGroupId: 2,
  },
  {
    name: "Tarjetas Gráficas",
    categoryGroupId: 2,
  },
  {
    name: "Cases",
    categoryGroupId: 2,
  },
  {
    name: "Fuentes de poder",
    categoryGroupId: 2,
  },
  {
    name: "Refrigeración líquida",
    categoryGroupId: 2,
  },
  {
    name: "Refrigeración Aire",
    categoryGroupId: 2,
  },
  {
    name: "Pasta térmica",
    categoryGroupId: 2,
  },
  {
    name: "Mouses",
    categoryGroupId: 3,
  },
  {
    name: "Teclados",
    categoryGroupId: 3,
  },
  {
    name: "Audífonos",
    categoryGroupId: 3,
  },
  {
    name: "Parlantes",
    categoryGroupId: 3,
  },
  {
    name: "Webcams",
    categoryGroupId: 3,
  },
  {
    name: "Micrófonos",
    categoryGroupId: 3,
  },
  {
    name: "Mousepad",
    categoryGroupId: 3,
  },
  {
    name: "Red - WiFi",
    categoryGroupId: 4,
  },
  {
    name: "Estabilizadores",
    categoryGroupId: 4,
  },
  {
    name: "UPS",
    categoryGroupId: 4,
  },
  {
    name: "Accesorios PC",
    categoryGroupId: 4,
  },
  {
    name: "Accesorios Laptop",
    categoryGroupId: 4,
  },
];

async function seedCategories() {
  console.log("[i] Insertando categorías...");

  try {
    const data = categoriesSeed.map((category) => ({
      name: category.name,
      slug: slugify(category.name, { lower: true }),
      categoryGroupId: category.categoryGroupId,
    }));

    await db.insert(categories).values(data).onConflictDoNothing();

    console.log(`[+] ${data.length} categorías procesadas.`);
  } catch (error) {
    console.error("[!] Error al insertar categorías:", error);
    throw error;
  }
}

async function main() {
  console.log("[i] Iniciando seed...");
  await seedCategories();
  console.log("[+] Seed finalizado.");

  await db.$client.end();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[!] Falló el seed:", error);
    process.exit(1);
  });
