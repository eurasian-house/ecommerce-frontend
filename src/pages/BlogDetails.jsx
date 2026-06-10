import { useParams } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Beyond Flat Floors: Why 3D Textured Rugs are Dominating 2026 Interior Design",
    content: "Full blog coming soon..."
  },
  {
    id: 2,
    title: "From Bhadohi with Love: Why Smart Homeowners are Choosing Artisanal Rugs Over Factory Mass-Production",
    content: "Full blog coming soon..."
  },
  {
    id: 3,
    title: "The New Neutral: How Earthy 3D Rugs Can Instantly Warm Up a Cold, Minimalist Room",
    content: "Full blog coming soon..."
  }
];

export default function BlogDetails() {
  const { id } = useParams();

  const blog = blogPosts.find(
    (post) => post.id === Number(id)
  );

  if (!blog) return <h2>Blog not found</h2>;

  return (
    <div className="container py-5">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}