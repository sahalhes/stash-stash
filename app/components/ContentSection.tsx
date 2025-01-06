export default function ContentSection() {
  const posts = [
    {
      id: 1,
      author: "Amit Das",
      time: "4 days ago",
      title: "Your portfolio is stopping you from geting that job",
      description: "An intense way to learn about the process and practice your designs skills – My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolio...",
      category: "Portfolio",
      readTime: "3 min read",
      tag: "Selected for you"
    },
    // Add more posts as needed
  ];

  return (
    <section className="py-4">
      <h2 className="text-xl font-semibold mb-4">Featured Content</h2>
      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-200" /> {/* Avatar placeholder */}
                <span className="text-sm">{post.author}</span>
                <span className="text-sm text-gray-500">· {post.time}</span>
              </div>
              <h3 className="font-semibold mb-1">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                <span>·</span>
                <span>{post.tag}</span>
              </div>
            </div>
            <div className="w-24 h-24 bg-gray-100 rounded-lg" /> {/* Image placeholder */}
          </article>
        ))}
      </div>
    </section>
  );
} 