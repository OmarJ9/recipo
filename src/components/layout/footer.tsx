import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm py-6">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-sm font-medium">Recipo</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xs text-muted-foreground">
                © {currentYear} Recipo
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
