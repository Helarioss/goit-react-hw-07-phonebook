import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Info = styled.span`
  margin-right: 7px;
`;
