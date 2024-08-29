import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LibsComponentsProps {}

const StyledLibsComponents = styled.div`
  color: pink;
`;

export function LibsComponents(props: LibsComponentsProps) {
  return (
    <StyledLibsComponents>
      <h1>Welcome to LibsComponents!</h1>
    </StyledLibsComponents>
  );
}

export default LibsComponents;
