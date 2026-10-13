import clsx from 'clsx';
import { card } from './Card.variants';
import styles from './Card.module.css';
import type { CardBodyProps, CardMediaProps, CardProps, CardTitleProps } from './Card.types';

const CardRoot = ({ ref, className, variant, interactive, ...props }: CardProps) => (
  <article ref={ref} className={clsx(card({ variant, interactive }), className)} {...props} />
);

const CardMedia = ({ ref, className, badge, children, ...props }: CardMediaProps) => (
  <div ref={ref} className={clsx(styles.media, className)} {...props}>
    {children}
    {badge != null && <div className={styles.mediaBadge}>{badge}</div>}
  </div>
);

const CardBody = ({ ref, className, ...props }: CardBodyProps) => (
  <div ref={ref} className={clsx(styles.body, className)} {...props} />
);

const CardTitle = ({ ref, className, as: Heading = 'h3', ...props }: CardTitleProps) => (
  <Heading ref={ref} className={clsx(styles.title, className)} {...props} />
);

export const Card = Object.assign(CardRoot, {
  Media: CardMedia,
  Body: CardBody,
  Title: CardTitle,
});
