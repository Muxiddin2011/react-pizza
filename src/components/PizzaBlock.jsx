import { useState } from 'react';

const typeNames = ['тонкое', 'традиционное'];
const sizeNames = [26, 30, 40];

export default function PizzaBlock({ pizza, cartCount, onAdd }) {
  const availableTypes = pizza.types?.length ? pizza.types : [0];
  const availableSizes = pizza.sizes?.length ? pizza.sizes : [26];
  const [type, setType] = useState(availableTypes[0]);
  const [size, setSize] = useState(availableSizes[0]);

  return (
    <article className="pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl || 'https://placehold.co/300x300?text=Pizza'} alt={pizza.title} />
      <h3 className="pizza-block__title">{pizza.title}</h3>
      <div className="pizza-block__selector">
        <ul>{availableTypes.map((value) => <li key={value} className={type === value ? 'active' : ''} onClick={() => setType(value)}>{typeNames[value] || 'тонкое'}</li>)}</ul>
        <ul>{availableSizes.map((value) => <li key={value} className={size === value ? 'active' : ''} onClick={() => setSize(value)}>{value} см.</li>)}</ul>
      </div>
      <div className="pizza-block__bottom">
        <b className="pizza-block__price">от {pizza.price.toLocaleString()} ₽</b>
        <button className="button button--add" type="button" onClick={() => onAdd({ ...pizza, type, size })}>
          + Добавить {cartCount > 0 && <i>{cartCount}</i>}
        </button>
      </div>
    </article>
  );
}
