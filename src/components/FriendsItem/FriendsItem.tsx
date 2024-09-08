import { ReactNode, useMemo } from 'react';

import FriendsItemType from '@types-all/friendsItemType';
import css from './FriendsItem.module.css';
import clsx from 'clsx';

type Props = {
  item: FriendsItemType;
};

type CustomLinkProps = {
  children: ReactNode;
  className: string;
  type?: string;
  value: string;
};

function FriendsItem({ item }: Props) {
  const email = item.email || (item.phone && 'phone only') || 'website only';
  const address = item.address || 'website only';
  const phone = item.phone || (item.email && 'email only') || 'website only';

  const openHours = useMemo(
    () =>
      item.workDays?.reduce((acc, dayItem) => {
        if (dayItem.isOpen && !acc) {
          return `${dayItem.from} - ${dayItem.to}`;
        }

        return acc;
      }, '') || 'Day and night',
    [item]
  );

  return (
    <li className={css.itemContainer}>
      <a href={item.url} target="_blank" className={css.imgContainer}>
        <img src={item.imageUrl} alt={item.title} loading="lazy" />
      </a>
      <div className={css.infoContainer}>
        <h3 className={css.title}>{item.title}</h3>
        <address className={css.addressContainer}>
          <ul className={css.addressList}>
            <li>
              <CustomLink className={css.link} type="mailto" value={item.email}>
                <span className={css.linkName}>Email:</span>
                <span className={css.linkValue}>{email}</span>
              </CustomLink>
            </li>
            <li>
              <CustomLink className={css.link} value={item.addressUrl}>
                <span className={css.linkName}>Address:</span>
                <span className={css.linkValue}>{address}</span>
              </CustomLink>
            </li>
            <li>
              <CustomLink className={css.link} value={item.phone} type="tel">
                <span className={css.linkName}>Phone:</span>
                <span className={css.linkValue}>{phone}</span>
              </CustomLink>
            </li>
          </ul>
        </address>
        <p className={css.openHours}>{openHours}</p>
      </div>
    </li>
  );
}

function CustomLink({ children, value, type, className }: CustomLinkProps) {
  const href = type ? `${type}:${value}` : value;

  return (
    <>
      {value && (
        <a
          href={href}
          className={clsx(className, css.clickable)}
          target="_blank"
        >
          {children}
        </a>
      )}
      {!value && <p className={className}>{children}</p>}
    </>
  );
}

export default FriendsItem;
