import Link from 'next/link';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem({id, title, image, address}) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <Link href={`/${id}`}>Show Details</Link>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
