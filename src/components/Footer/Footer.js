import { memo } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import styles from './Footer.module.scss';

import routes from '../../data/routes';
import Icon from '../Icon/Icon';

function Footer() {
  return (
    <footer className={classnames(styles.Footer)}>
      <h2>Footer</h2>
      <Icon className={classnames(styles.logo)} />
      <nav className={classnames(styles.nav)}>
        <ul className={classnames(styles.menu)}>
          {Object.values(routes).map(({ path, title }) => (
            <li key={path} className={classnames(styles.menuItem)}>
              <Link href={path}>
                <a aria-label={path} href={path}>
                  {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

Footer.defaultProps = {};

export default memo(Footer);
