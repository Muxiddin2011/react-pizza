import { categories } from './categoriesData';

export default function Categories({ activeCategory, onChange }) {
  return (
    <ul className="categories">
      {categories.map((category) => (
        <li key={String(category.id)} className={activeCategory === category.id ? 'active' : ''}>
          <button type="button" onClick={() => onChange(category.id)}>{category.name}</button>
        </li>
      ))}
    </ul>
  );
}
