import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyLoad = (props) => {
  const {scrollPosition, film} = props;
  const [error, setError] = useState(false);

  return (
    <div>
      <LazyLoadImage
        alt={
          error
            ? 'error-image'
            : film.poster
        }
        effect='blur'
        scrollPosition={scrollPosition}
        src={
          error
            ? 'https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693888069/no-Image-Placeholder_wpd9qn.png'
            : film.poster
        }
        wrapperClassName='gallery__link-item gallery-img-wrapper w-full h-full absolute top-0'
        onError={() => setError(true)}
      />
      {/* {film.poster} */}
    </div>
  );
};

LazyLoad.propTypes = {
  scrollPosition: PropTypes.any,
  film: PropTypes.object.isRequired
}

LazyLoad.defaultProps = {
  scrollPosition: null
}

export default LazyLoad;
