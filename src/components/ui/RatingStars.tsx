type RatingStarsProps = {
  value?: number;
  max?: number;
};

export function RatingStars({ value = 4, max = 5 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-amber-500" aria-label={`rating-${value}`}>
      {Array.from({ length: max }).map((_, index) => (
        <span key={index}>{index < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
