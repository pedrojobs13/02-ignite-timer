import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  color: ${({ theme }) => theme["gray-100"]};
`;

export const StartCountDownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["green-500"]};
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;

    &:not(:defined):hover {
      background: ${({ theme }) => theme["green-700"]};
    }
  }
`;

export const StopCountDownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["red-500"]};
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;

    &:not(:defined):hover {
      background: ${({ theme }) => theme["red-700"]};
    }
  }
`;