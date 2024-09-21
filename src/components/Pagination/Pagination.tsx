import ReactPaginate from 'react-paginate';
import clsx from 'clsx';

import css from './Pagination.module.css';
import useMedia from '@hooks/useMedia';
import useMediaType from '@types-all/useMediaType';
import Icon from '@components/Icon/Icon';

type onChangeArg = {
  selected: number;
};

type onClickArg = {
  event: React.SyntheticEvent;
  index: number;
  isActive: boolean;
  isBreak: boolean;
  isNext: boolean;
  isPrevious: boolean;
  nextSelectedPage: number;
  selected: number;
};

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

function Pagination({ page, totalPages, onChange }: Props) {
  const { isMobile }: useMediaType = useMedia();

  const { pageRange, itemClasses } = calculatePageRange(
    isMobile,
    page,
    totalPages
  );

  const handlePageChange = (e: onChangeArg): void => {
    onChange(e.selected + 1);
  };

  const handleClick = ({ isBreak }: onClickArg): boolean => {
    return !isBreak;
  };

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const iconWidth = isMobile ? 6 : 8;
  const iconHeight = isMobile ? 12 : 14;
  const listItemClass = clsx(css.listItem, itemClasses.join(' '));

  return (
    <div className={css.container}>
      <a
        className={clsx(css.arrowLink, isFirstPage && css.disabled)}
        aria-label="First Page"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          if (!isFirstPage) onChange(1);
        }}
        {...(!isFirstPage && { href: '' })}
      >
        <span className={css.iconsContainer}>
          <Icon name="chevron-left" width={iconWidth} height={iconHeight} />
          <Icon name="chevron-left" width={iconWidth} height={iconHeight} />
        </span>
      </a>
      <ReactPaginate
        onPageChange={handlePageChange}
        forcePage={Math.max(0, page - 1)}
        pageRangeDisplayed={pageRange}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        pageClassName={listItemClass}
        pageLinkClassName={css.pageLink}
        previousLabel={
          <Icon name="chevron-left" width={iconWidth} height={iconHeight} />
        }
        previousClassName={clsx(listItemClass, css.listNavItem)}
        previousLinkClassName={css.pageLink}
        nextLabel={
          <Icon name="chevron-right" width={iconWidth} height={iconHeight} />
        }
        nextClassName={clsx(listItemClass, css.listNavItem)}
        nextLinkClassName={css.pageLink}
        breakLabel="..."
        breakClassName={listItemClass}
        breakLinkClassName={clsx(css.pageLink, css.disabled)}
        containerClassName={css.list}
        activeClassName={css.current}
        disabledLinkClassName={css.disabled}
        renderOnZeroPageCount={null}
        onClick={handleClick}
      />
      <a
        className={clsx(css.arrowLink, isLastPage && css.disabled)}
        aria-label="Last Page"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          if (!isLastPage) onChange(totalPages);
        }}
        {...(!isLastPage && { href: '' })}
      >
        <span className={css.iconsContainer}>
          <Icon name="chevron-right" width={iconWidth} height={iconHeight} />
          <Icon name="chevron-right" width={iconWidth} height={iconHeight} />
        </span>
      </a>
    </div>
  );
}

export default Pagination;

function calculatePageRange(
  isMobile: boolean,
  page: number,
  totalPages: number
): { pageRange: number; itemClasses: string[] } {
  let pageRange;
  let itemClasses = [];

  if (isMobile) {
    switch (page) {
      case 1:
        pageRange = 2;
        itemClasses.push(`${css.hideLastLink}`);
        break;
      case 2:
        pageRange = 0;
        itemClasses.push(`${css.hideLastLink}`);
        break;
      case totalPages - 1:
        pageRange = 0;
        itemClasses.push(`${css.hideFirstLink}`);
        break;
      case totalPages:
        pageRange = 2;
        itemClasses.push(`${css.hideFirstLink}`);
        break;
      default:
        pageRange = 0;
        itemClasses.push(`${css.hideFirstLink}`);
        itemClasses.push(`${css.hideLastLink}`);
        break;
    }

    if (totalPages < 4) itemClasses = [];
  } else {
    switch (page) {
      case 1:
        pageRange = 4;
        itemClasses.push(`${css.hideLastLink}`);
        break;
      case 2:
        pageRange = 3;
        itemClasses.push(`${css.hideLastLink}`);
        break;
      case 3:
        pageRange = 2;
        itemClasses.push(`${css.hideLastLink}`);
        break;
      case totalPages - 2:
        pageRange = 2;
        itemClasses.push(`${css.hideFirstLink}`);
        break;
      case totalPages - 1:
        pageRange = 4;
        itemClasses.push(`${css.hideFirstLink}`);
        break;
      case totalPages:
        pageRange = 4;
        itemClasses.push(`${css.hideFirstLink}`);
        break;
      default:
        pageRange = 2;
        itemClasses.push(`${css.hideFirstLink}`);
        itemClasses.push(`${css.hideLastLink}`);
        break;
    }

    if (totalPages < 6) itemClasses = [];
  }

  return { pageRange, itemClasses };
}
