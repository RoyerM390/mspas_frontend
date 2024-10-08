import PropTypes from 'prop-types';
import React, { memo } from 'react';

const AppAnimate = ({ loading, animation, delay, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

AppAnimate.propTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
};

AppAnimate.defaultProps = {};

export default memo(AppAnimate);

// import PropTypes from 'prop-types';
// import React, {memo} from 'react';
// import {VelocityComponent} from 'velocity-react';
// import 'velocity-animate/velocity.ui';
//
// const AppAnimate = (props) => {
//   const children = React.cloneElement(props.children, {
//     style: {
//       ...props.children.style,
//       visibility: 'hidden',
//     },
//   });
//   return <VelocityComponent {...props}>{children}</VelocityComponent>;
// };
//
// AppAnimate.propTypes = {
//   children: PropTypes.element.isRequired,
// };
//
// AppAnimate.defaultProps = {
//   animation: 'transition.fadeIn',
//   runOnMount: true,
//   targetQuerySelector: null,
//   interruptBehavior: 'stop',
//   visibility: 'visible',
//   duration: 400,
//   delay: 100,
//   easing: [0.4, 0.0, 0.2, 1],
//   display: null,
//   setRef: undefined,
//
//   // duration: 400,
//   // easing: "swing",
//   queue: '',
//   begin: undefined,
//   progress: undefined,
//   complete: undefined,
//   // display: undefined,
//   // visibility: undefined,
//   loop: false,
//   // delay: false,
//   mobileHA: true,
// };
//
// export default memo(AppAnimate);
