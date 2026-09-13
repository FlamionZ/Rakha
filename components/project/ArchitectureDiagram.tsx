"use client";

import { Reveal } from "@/components/motion/Reveal";
import { hasTechIcon, TechIcon } from "@/components/tech/TechIcon";
import type { Architecture } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * The system, drawn as layers.
 *
 * The case studies describe architecture well in prose but nothing showed it,
 * which is the difference between claiming you think in systems and
 * demonstrating it. Layers rather than a node graph on purpose: a graph needs
 * absolutely-positioned edges, and those are precisely what breaks at phone
 * width. Here the flow is carried by document order, so it stacks.
 *
 * `insight` is the line the whole diagram exists to deliver — it says what the
 * shape buys you, which is the part a reader cannot infer from a box.
 */
/**
 * Node labels are written for the reader ("Redis queue", "Python
 * microservice"), not to match the icon registry. Fall back to the first
 * segment, then the first word, so those still pick up their mark.
 */
function iconFor(tech: string): string | null {
  const candidates = [tech, tech.split(" · ")[0], tech.split(" ")[0]];
  return candidates.find((candidate) => hasTechIcon(candidate)) ?? null;
}

export function ArchitectureDiagram({
  architecture,
  accent,
}: {
  architecture: Architecture;
  accent: string;
}) {
  const { t } = useLocale();

  return (
    <section
      className="px-5 py-20 sm:px-8 sm:py-28"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label mb-10 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            {t(ui.project.diagram)}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ol className="relative">
              {architecture.layers.map((layer, i) => {
                const isLast = i === architecture.layers.length - 1;

                return (
                  <Reveal key={layer.label.en} delay={i * 0.06}>
                    <li className="relative pb-8 last:pb-0">
                      {/* Connector to the next layer. Dashed means the work
                          happens off the request's hot path. */}
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-[7px] top-5 h-full w-px ${
                            architecture.layers[i + 1]?.async
                              ? "bg-[linear-gradient(to_bottom,var(--color-border-bright)_50%,transparent_50%)] bg-[length:1px_7px]"
                              : "bg-border-bright"
                          }`}
                        />
                      )}

                      <div className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="relative mt-[5px] block h-[15px] w-[15px] shrink-0 rounded-full border-2 border-bg"
                          style={{ background: accent }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="label mb-3">{t(layer.label)}</p>

                          <div className="space-y-2.5">
                            {layer.nodes.map((node) => (
                              <div
                                key={node.tech}
                                className={`rounded-sm border bg-surface/60 px-4 py-3 ${
                                  node.ai
                                    ? "border-[var(--accent)]/45"
                                    : "border-border"
                                }`}
                              >
                                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-sm text-fg">
                                  {iconFor(node.tech) && (
                                    <TechIcon
                                      name={iconFor(node.tech) as string}
                                      className="h-3.5 w-3.5 shrink-0 text-muted"
                                    />
                                  )}
                                  {node.tech}
                                  {node.ai && (
                                    <span
                                      className="font-mono text-[10px] uppercase tracking-[0.16em]"
                                      style={{ color: accent }}
                                    >
                                      AI
                                    </span>
                                  )}
                                </p>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                  {t(node.note)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          {/* The decision the shape buys you */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <figure className="lg:sticky lg:top-28">
              <p className="label mb-4">{t(ui.project.diagramInsight)}</p>
              <blockquote
                className="border-l-2 pl-5 text-lg leading-relaxed text-fg"
                style={{ borderColor: accent }}
              >
                {t(architecture.insight)}
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
