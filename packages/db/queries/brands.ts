"use server";

import { db } from "@renovabit/db/index";
import { type Brand, brands } from "@renovabit/db/schema";
import { eq } from "drizzle-orm";

/**
 * Obtiene todas las marcas
 */
export async function getBrands(): Promise<Brand[]> {
  try {
    const result = await db.select().from(brands);

    if (result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    throw new Error("No se pudieron obtener las marcas");
  }
}

/**
 * Obtiene una marca por ID
 */
export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    if (!id) {
      throw new Error("ID de marca es requerido");
    }

    const result = await db.select().from(brands).where(eq(brands.id, id));

    if (result.length === 0) {
      return null;
    }

    return result[0] ?? null;
  } catch (error) {
    console.error("Error al obtener marca por ID:", error);
    throw new Error("No se pudo obtener la marca por ID");
  }
}

/**
 * Obtiene una marca por slug
 */
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  try {
    if (!slug) {
      throw new Error("Slug de marca es requerido");
    }

    const result = await db.select().from(brands).where(eq(brands.slug, slug));

    if (result.length === 0) {
      return null;
    }

    return result[0] ?? null;
  } catch (error) {
    console.error("Error al obtener marca por slug:", error);
    throw new Error("No se pudo obtener la marca por slug");
  }
}
