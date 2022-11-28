import ReactGA from 'react-ga4';

const useGAEventsTrackers = () => {
    const trackEvent = (category, action, label) => {
        ReactGA.event({category: category, action: action, label: label});
    }
  return trackEvent;
}

export default useGAEventsTrackers;