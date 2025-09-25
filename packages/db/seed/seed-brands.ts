/** biome-ignore-all lint/suspicious/noConsole: <Is seed script> */
import "dotenv/config";
import slugify from "slugify";
import { db } from "@/index";
import { brands } from "@/schema";

const brandsSeed = [
  {
    name: "1st PLayer",
  },
  {
    name: "Acer",
  },
  {
    name: "AMD",
  },
  {
    name: "Antryx",
  },
  {
    name: "Asrock",
  },
  {
    name: "Asus",
  },
  {
    name: "Dahua",
  },
  {
    name: "Dell",
  },
  {
    name: "Gigabyte",
  },
  {
    name: "Havit",
  },
  {
    name: "HP",
  },
  {
    name: "Intel",
  },
  {
    name: "Lenovo",
  },
  {
    name: "Lg",
  },
  {
    name: "Micronics",
  },
  {
    name: "MSI",
  },
  {
    name: "NVIDIA",
  },
  {
    name: "Patriot",
  },
  {
    name: "Samsung",
  },
  {
    name: "Teros",
  },
  {
    name: "Vulcan",
  },
  {
    name: "Wacom",
  },
  {
    name: "Xiaomi",
  },
  {
    name: "XPG",
  },
];

async function seedBrands() {
  console.log("[i] Insertando marcas...");

  try {
    const data = brandsSeed.map((brand) => ({
      name: brand.name,
      slug: slugify(brand.name, { lower: true }),
    }));

    await db.insert(brands).values(data).onConflictDoNothing();

    console.log(`[+] ${data.length} marcas procesadas.`);
  } catch (error) {
    console.error("[!] Error al insertar marcas:", error);
    throw error;
  }
}

async function main() {
  console.log("[i] Iniciando seed de marcas...");
  await seedBrands();

  console.log("[+] Seed de marcas finalizado.");
  await db.$client.end();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[!] Falló el seed de marcas:", error);
    process.exit(1);
  });
