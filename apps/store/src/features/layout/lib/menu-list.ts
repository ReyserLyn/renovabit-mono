import { getBrands } from "@renovabit/db/queries/brands";
import { getCategoryNavigationData } from "@renovabit/db/queries/categories";
import type { Brand } from "@renovabit/db/schema";
import {
  Badge,
  Computer,
  Cpu,
  Files,
  Info,
  Laptop,
  type LucideIcon,
  Mouse,
  Package,
  Settings,
  SquarePercent,
  Store,
  User,
} from "lucide-react";
import { INFO_LINKS } from "@/features/layout/constants/navigation";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

type CategoryItem = {
  title: string;
  slug: string;
};

type CategoryGroup = {
  title: string;
  items: CategoryItem[];
};

function getCategoryIcon(categoryName: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    Componentes: Cpu,
    Periféricos: Mouse,
    Equipos: Laptop,
    Productos: Package,
  };

  if (iconMap[categoryName]) {
    return iconMap[categoryName];
  }

  const lowerCategoryName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (
      lowerCategoryName.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerCategoryName)
    ) {
      return icon;
    }
  }

  return Package;
}

function convertCategoryDataToMenus(categoryData: CategoryGroup[]): Menu[] {
  return categoryData.map((group) => ({
    href: "",
    label: group.title,
    icon: getCategoryIcon(group.title),
    submenus: group.items.map((item) => ({
      href: `/categoria/${item.slug}`,
      label: item.title,
    })),
  }));
}

function convertBrandsToSubmenus(brands: Brand[]): Submenu[] {
  return brands
    .filter((brand) => brand.isActive)
    .map((brand) => ({
      href: `/marca/${brand.slug}`,
      label: brand.name,
    }));
}

export async function getMenuList(): Promise<Group[]> {
  try {
    const [categoryData, brands] = await Promise.all([
      getCategoryNavigationData(),
      getBrands(),
    ]);

    const categoryMenus = convertCategoryDataToMenus(categoryData);
    const brandSubmenus = convertBrandsToSubmenus(brands);

    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "Inicio",
            icon: Store,
            submenus: [],
          },
          {
            href: "/ofertas",
            label: "Ofertas",
            icon: SquarePercent,
            submenus: [],
          },
          {
            href: "/arma-tu-pc",
            label: "Arma tu PC",
            icon: Computer,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Categorias",
        menus: [
          ...categoryMenus,
          {
            href: "",
            label: "Marcas",
            icon: Badge,
            submenus: brandSubmenus,
          },
          {
            href: "",
            label: "Información",
            icon: Info,
            submenus: INFO_LINKS.map((link) => ({
              href: link.href,
              label: link.label,
            })),
          },
        ],
      },
      {
        groupLabel: "Mi Cuenta",
        menus: [
          {
            href: "/perfil",
            label: "Perfil",
            icon: User,
          },
          {
            href: "/ordenes",
            label: "Ordenes",
            icon: Files,
          },
          {
            href: "/preferencias",
            label: "Preferencias",
            icon: Settings,
          },
        ],
      },
    ];
  } catch (error) {
    console.error("Error al cargar el menú:", error);
    return getStaticMenuList();
  }
}

function getStaticMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Inicio",
          icon: Store,
          submenus: [],
        },
        {
          href: "/ofertas",
          label: "Ofertas",
          icon: SquarePercent,
          submenus: [],
        },
        {
          href: "/arma-tu-pc",
          label: "Arma tu PC",
          icon: Computer,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Mi Cuenta",
      menus: [
        {
          href: "/perfil",
          label: "Perfil",
          icon: User,
        },
        {
          href: "/ordenes",
          label: "Ordenes",
          icon: Files,
        },
        {
          href: "/preferencias",
          label: "Preferencias",
          icon: Settings,
        },
      ],
    },
  ];
}
