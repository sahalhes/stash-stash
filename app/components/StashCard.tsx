import { MoreHorizontal } from 'lucide-react';

interface StashCardProps {
  title: string;
  author: string;
  timeAgo: string;
  description?: string;
  category?: string;
  readTime?: string;
  tag?: string;
  image?: string;
}

export default function StashCard({
  title,
  author,
  timeAgo,
  description,
  category,
  readTime,
  tag,
  image
}: StashCardProps) {
  return (
    <article className="flex justify-between items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-sm font-medium">{author}</span>
          <span className="text-sm text-gray-500">· {timeAgo}</span>
        </div>
        <h3 className="font-semibold mb-1 hover:text-blue-600 cursor-pointer">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm mb-2">{description}</p>
        )}
        {(category || readTime || tag) && (
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {category && <span>{category}</span>}
            {readTime && (
              <>
                <span>·</span>
                <span>{readTime}</span>
              </>
            )}
            {tag && (
              <>
                <span>·</span>
                <span>{tag}</span>
              </>
            )}
          </div>
        )}
      </div>
      {image && (
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>
    </article>
  );
} 