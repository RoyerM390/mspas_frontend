import React from "react";
import IntlMessages from "@aqtiva/helpers/IntlMessages";
import PropTypes from "prop-types";
import AppImage from "@aqtiva/components/AppImage";
import UserSocialMediaInfo from "./UserSocialMediaInfo";
import {
  StyledUserFlatListItem,
  StyledUserFlatListItemContent,
  StyledUserFlatListItemInner,
  StyledUserFlatListItemPara,
  StyledUserFlatListItemThumb
} from "../index.styled";

const ListItem = (props) => {
  const {user} = props;

  return (
    <StyledUserFlatListItem>
      <StyledUserFlatListItemInner>
        <StyledUserFlatListItemThumb>
          <AppImage src={user.image} alt='user' />
        </StyledUserFlatListItemThumb>

        <StyledUserFlatListItemContent>
          <h3>
            <span>{user.name}</span>
            <span>
              <IntlMessages id='common.in' />
            </span>
            <span className='user-des'>{user.topic}</span>
          </h3>

          <StyledUserFlatListItemPara>
            {user.information}
          </StyledUserFlatListItemPara>

          <UserSocialMediaInfo user={user} />
        </StyledUserFlatListItemContent>
      </StyledUserFlatListItemInner>
    </StyledUserFlatListItem>
  );
};

export default ListItem;

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
