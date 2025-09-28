import { Badge } from "@renovabit/ui/components/ui/badge";
import { Button } from "@renovabit/ui/components/ui/button";
import { ShoppingCart } from "lucide-react";

type CartButtonProps = {
  itemCount?: number;
  totalPrice?: number;
  onCartClick?: () => void;
};

export default function CartButton({
  itemCount = 0,
  totalPrice = 0,
  onCartClick,
}: CartButtonProps) {
  const displayCount = itemCount > 99 ? "99+" : itemCount.toString();
  const hasItems = itemCount > 0;
  const displayText = hasItems ? `S/ ${totalPrice.toFixed(2)}` : "Carrito";

  return (
    <>
      {/* Mobile */}
      <Button
        aria-label={`Carrito con ${itemCount} productos`}
        className="relative md:hidden"
        mode="icon"
        onClick={onCartClick}
        variant="outline"
      >
        <ShoppingCart />
        {hasItems && (
          <Badge
            className="-translate-y-1/2 -translate-x-1/2 absolute start-full top-0 rtl:translate-x-1/2"
            shape="circle"
            size="sm"
            variant="primary"
          >
            {displayCount}
          </Badge>
        )}
      </Button>

      {/* Desktop */}
      <Button
        aria-label={`Carrito con ${itemCount} productos`}
        className="hidden md:flex"
        onClick={onCartClick}
        variant="outline"
      >
        <ShoppingCart />
        {displayText}
        {hasItems && (
          <Badge shape="circle" size="sm" variant="primary">
            {displayCount}
          </Badge>
        )}
      </Button>
    </>
  );
}
