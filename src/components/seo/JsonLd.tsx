// Tiny helper for injecting <script type="application/ld+json"> blocks.
// Renders on the server so crawlers see it in the initial HTML.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
