import { BeatLoader } from 'react-spinners';

const LoadingSpinner = ({ loading = true, color = '#ff3e3d', size = 12 }) => {
  return (
    <div>
      <BeatLoader
        color={color}
        loading={loading}
        speedMultiplier={1}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
