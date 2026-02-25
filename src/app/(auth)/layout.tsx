import { Container } from "@/components/layout/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12">
      <div className="mx-auto w-full max-w-md">{children}</div>
    </Container>
  );
}
