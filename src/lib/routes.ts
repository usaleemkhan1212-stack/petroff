/**
 * Routes that actually exist today.
 *
 * Everything the design links to is still listed in `nav.ts`, `bibliotheque.ts`
 * and the section data, but only the entries here render as real links — the
 * rest stay inert so nothing on the site can navigate to a 404. Add a path
 * here the moment its page lands and every call site starts linking.
 */
export const liveRoutes: readonly string[] = [
  "/",
  "/expertises",
  "/expertises/contentieux-arbitrage",
  "/expertises/contrats-commerciaux",
  "/expertises/droit-fiscal",
  "/expertises/droit-social",
  "/expertises/fusions-acquisitions",
  "/expertises/immobilier-entreprise",
  "/expertises/propriete-intellectuelle",
  "/expertises/recouvrement",
  "/expertises/contentieux-arbitrage/service-page",
  "/le-cabinet/personal-page",
  "/bibliotheque",
  "/bibliotheque/article-design",
  "/bibliotheque/avocat-e-commerce",
  "/bibliotheque/new-article-page",
  "/bibliotheque/resultats",
  "/confidentialite",
] as const;

export function isLive(href: string) {
  return liveRoutes.includes(href);
}
