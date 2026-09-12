/**
 * Emits a JSON-LD block.
 *
 * The payloads come from our own content files, never from user input — but the
 * `<` escape stays regardless: it is the one character that could close the
 * script element early, and relying on "the data is trusted" is exactly how
 * that stops being true after a refactor.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
