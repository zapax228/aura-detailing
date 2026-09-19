import { ArrowRight } from 'lucide-react';

export type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="service-image-wrap">
        <img src={service.image} alt={service.title} />
      </div>
      <div className="service-body">
        <span className="service-number">{service.number}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <span className="learn-more">
          Learn more
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}
