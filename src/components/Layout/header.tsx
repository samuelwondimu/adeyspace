import * as React from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

type MenuItem = {
  title: string;
  href?: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "Topics",
    submenu: [
      { title: "Wellness", href: "/wellness" },
      { title: "Career & Finance", href: "/career-finance" },
      { title: "Style & Beauty", href: "/style-beauty" },
      { title: "Relationships", href: "/relationships" },
      { title: "Inspiration", href: "/inspiration" },
    ],
  },
  {
    title: "Games",
    submenu: [{ title: "Wordle", href: "/games/wordle" }],
  },
  { title: "Contact", href: "/contact" },
];

export function MainNavigation() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.submenu ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 sm:w-[400px] md:grid-cols-2 lg:w-[500px]">
                      {item.submenu.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          title={subItem.title}
                          href={subItem.href ?? ""}
                        >
                          {subItem.title}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item.href ?? ""} legacyBehavior passHref>
                  <a className="px-4 py-2 text-sm font-medium hover:underline">
                    {item.title}
                  </a>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-2 text-lg font-medium transition-colors hover:text-primary",
              depth > 0 && "pl-4"
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={subItem.title}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href}
      className={cn(
        "block py-2 text-lg font-medium transition-colors hover:text-primary",
        depth > 0 && "pl-4",
        item.href === "/" && "text-primary"
      )}
    >
      {item.title}
    </a>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const Header = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div className="container flex justify-between items-center mx-auto py-4">
        <Link href="/" className="flex items-center">
          <p className="text-primary font-bold">ADEY SPACE.</p>
        </Link>
        <MainNavigation />
        <div className="flex gap-4">
          <Button variant="outline">Login</Button>
          <Button>Subscripe</Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full px-4">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <MenuItemComponent key={item.title} item={item} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
