// import React, {useEffect} from 'react';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
// import { useRouter } from "next/router";
//
// const AppScrollbar = ({children, scrollToTop, className, ...others}) => {
//   let _scrollBarRef = null;
//   const { pathname } = useRouter();
//
//   useEffect(() => {
//     if (scrollToTop && _scrollBarRef) {
//       _scrollBarRef._container.scrollTop = 0;
//     }
//   }, [_scrollBarRef, scrollToTop, pathname]);
//
//   return (
//     <PerfectScrollbar
//       ref={(ref) => {
//         _scrollBarRef = ref;
//       }}
//       {...others}
//       className={className}>
//       {children}
//     </PerfectScrollbar>
//   );
// };
//
// export default AppScrollbar;
//
// AppScrollbar.defaultProps = {
//   className: '',
//   scrollToTop: true,
// };
//
// AppScrollbar.propTypes = {
//   children: PropTypes.node.isRequired,
//   scrollToTop: PropTypes.bool,
//   className: PropTypes.string,
// };
import React from "react";
import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
import styled from "styled-components";

export const StyledScrollbar = styled(SimpleBarReact)`
  position: relative;
  width: 100%;
  height: 100%;

  & .simplebar-offset,
  & .simplebar-content-wrapper,
  & .simplebar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

// eslint-disable-next-line no-unused-vars
const AppScrollbar = ({children, scrollToTop, className, ...others}) => {
  return (
    <StyledScrollbar {...others} className={className}>
      {children}
    </StyledScrollbar>
  );
};

export default AppScrollbar;

AppScrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  scrollToTop: PropTypes.bool,
};
