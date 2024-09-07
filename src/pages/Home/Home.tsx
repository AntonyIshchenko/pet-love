import css from './Home.module.css';

import heroDesk from '@images/hero-desk.webp';
import heroDesk2x from '@images/hero-desk@2x.webp';
import heroTab from '@images/hero-tab.webp';
import heroTab2x from '@images/hero-tab@2x.webp';
import heroMob from '@images/hero-mob.webp';
import heroMob2x from '@images/hero-mob@2x.webp';

function Home() {
  return (
    <>
      <div className={css.headingWrapper}>
        <div className={css.heading}>
          <h1 className={css.title}>
            Take good <span className={css.titleAccent}>care</span> of your
            small pets
          </h1>
          <p className={css.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <div className={css.imgWrapper}>
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet={`${heroDesk} 1x, ${heroDesk2x} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${heroTab} 1x, ${heroTab2x} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${heroMob} 1x, ${heroMob2x} 2x`}
            type="image/webp"
          />
          <img src={heroMob} alt="hero image" loading="lazy" />
        </picture>
      </div>
    </>
  );
}

export default Home;
