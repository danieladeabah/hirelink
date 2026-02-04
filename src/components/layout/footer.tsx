export function Footer() {
  return (
    <footer className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
