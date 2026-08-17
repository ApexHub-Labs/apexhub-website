type MarqueeProps = {
  items: string[];
  /** render every other item as an outline for editorial rhythm */
  outlineAlternate?: boolean;
};

/**
 * Infinite horizontal ticker. The item list is duplicated so the CSS
 * translateX(-50%) loop is seamless. Pauses on hover.
 */
export default function Marquee({
  items,
  outlineAlternate = true,
}: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`marquee__item ${
              outlineAlternate && i % 2 === 1 ? "marquee__item--outline" : ""
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
