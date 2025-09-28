import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@renovabit/ui/components/ui/navigation-menu";
import { ListItem } from "./list-item";

export function InfoMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Información</NavigationMenuTrigger>

      <NavigationMenuContent className="p-4">
        <div className="grid grid-cols-1 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <div className="px-2">
            <h6 className="mb-2.5 font-semibold text-muted-foreground text-sm uppercase">
              Empresa
            </h6>
            <ul className="grid gap-3">
              <ListItem href="/sobre-nosotros" title="Sobre Nosotros" />
              <ListItem href="/contacto" title="Contacto" />
            </ul>
          </div>

          <div className="px-2">
            <h6 className="mb-2.5 font-semibold text-muted-foreground text-sm uppercase">
              Políticas
            </h6>
            <ul className="grid gap-3">
              <ListItem
                href="/terminos-condiciones"
                title="Términos y Condiciones"
              />
              <ListItem
                href="/politica-privacidad"
                title="Política de Privacidad"
              />
              <ListItem href="/politica-envios" title="Política de Envíos" />
              <ListItem
                href="/politica-devoluciones"
                title="Devoluciones y Garantía"
              />
            </ul>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
