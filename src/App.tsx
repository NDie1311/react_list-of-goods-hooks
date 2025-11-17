import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  None = 'none',
  Alphabetical = 'alpha',
  Length = 'length',
}

type ButtonType = 'info' | 'success' | 'warning' | 'danger';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort(SortType.Alphabetical);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return a.localeCompare(b);
    });

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort(SortType.Length);
  };

  const reverseList = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setGoods(goodsFromServer);
    setActiveSort(SortType.None);
    setIsReversed(false);
  };

  const getButtonClass = (type: ButtonType) => {
    const baseClass = `button is-${type}`;

    switch (type) {
      case 'info':
        return `${baseClass} ${activeSort === SortType.Alphabetical ? '' : 'is-light'}`;
      case 'success':
        return `${baseClass} ${activeSort === SortType.Length ? '' : 'is-light'}`;
      case 'warning':
        return `${baseClass} ${isReversed ? '' : 'is-light'}`;
      default:
        return baseClass;
    }
  };

  const isOriginalOrder = activeSort === SortType.None && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('info')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('success')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('warning')}
          onClick={reverseList}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={getButtonClass('danger')}
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
