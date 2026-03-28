export default function NoteTags({ tags }: { tags: string[] | null }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
