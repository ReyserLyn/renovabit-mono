"use server";

import { db } from "@renovabit/db/index";
import {
  type Category,
  type CategoryGroup,
  categories,
  categoryGroups,
} from "@renovabit/db/schema";
import { eq } from "drizzle-orm";

/**
 * Obtiene todas las categorías
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const result = await db.select().from(categories);

    if (result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw new Error("No se pudieron obtener las categorías");
  }
}

/**
 * Obtiene una categoría por ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    if (!id) {
      throw new Error("ID de categoría es requerido");
    }

    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (result.length === 0) {
      return null;
    }

    return result[0] ?? null;
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${id}:`, error);
    throw new Error(`No se pudo obtener la categoría con ID ${id}`);
  }
}

/**
 * Obtiene una categoría por slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    if (!slug) {
      throw new Error("Slug de categoría es requerido");
    }

    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));

    if (result.length === 0) {
      return null;
    }

    return result[0] ?? null;
  } catch (error) {
    console.error(`Error al obtener categoría con slug ${slug}:`, error);
    throw new Error(`No se pudo obtener la categoría con slug ${slug}`);
  }
}

/**
 * Obtiene todos los grupos de categorías
 */
export async function getCategoryGroups(): Promise<CategoryGroup[]> {
  try {
    const result = await db.select().from(categoryGroups);

    if (result.length === 0) {
      return [];
    }

    return result as CategoryGroup[];
  } catch (error) {
    console.error("Error al obtener los grupos de las categorías:", error);
    throw new Error("No se pudieron obtener los grupos de las categorías");
  }
}

/**
 * Obtiene los datos de navegación de categorías
 */
export async function getCategoryNavigationData() {
  try {
    const [groups, categoryList] = await Promise.all([
      getCategoryGroups(),
      getCategories(),
    ]);

    const navData = groups.map((group) => ({
      title: group.name,
      items: categoryList
        .filter((category) => category.categoryGroupId === group.id)
        .map((category) => ({
          title: category.name,
          slug: category.slug,
        })),
    }));

    return navData;
  } catch (error) {
    console.error("Error al obtener datos de navegación:", error);
    throw new Error("No se pudieron obtener los datos de navegación");
  }
}
