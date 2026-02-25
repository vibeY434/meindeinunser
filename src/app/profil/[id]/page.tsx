import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Profil",
};

export default function PublicProfilePage() {
  return (
    <Container className="py-8">
      <p className="text-text-light text-sm">
        Öffentliches Profil wird in Phase 5 implementiert.
      </p>
    </Container>
  );
}
