import ReactGA from 'react-ga';

const trackingCode = process.env.REACT_APP_GA_TRACKING_CODE // || 'your code here'

ReactGA.initialize(trackingCode);

export default ReactGA;