import React from "react";
import IntlMessages from "@aqtiva/helpers/IntlMessages";
import KBItem from "./KBItem";
import PropTypes from "prop-types";
import AppRowContainer from "@aqtiva/components/AppRowContainer";
import { StyledKnowSales } from "./index.styled";
import AppAnimate from "@aqtiva/components/AppAnimate";

const Sales = ({saleQueries}) => {
  return (
    <StyledKnowSales>
      <AppAnimate animation='transition.slideLeftIn' delay={200}>
        <h3>
          <IntlMessages id='knowledge.sales' />
        </h3>
      </AppAnimate>
      <AppRowContainer>
        {saleQueries.map((sale, index) => (
          <KBItem data={sale} key={index} />
        ))}
      </AppRowContainer>
    </StyledKnowSales>
  );
};

export default Sales;

Sales.propTypes = {
  saleQueries: PropTypes.array.isRequired,
};
