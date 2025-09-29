import { getMenuList } from "../lib/menu-list";
import { SheetMenu } from "./sidebar/sheet-menu";

type SidebarProviderProps = {
  children: React.ReactNode;
};

export async function SidebarProvider({ children }: SidebarProviderProps) {
  const data = await getMenuList();

  return (
    <>
      <SheetMenu data={data} />
      {children}
    </>
  );
}
