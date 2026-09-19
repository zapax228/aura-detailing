export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="work-card">
      <div className="work-image-wrap">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="work-info">
        <div className="work-meta">
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}
