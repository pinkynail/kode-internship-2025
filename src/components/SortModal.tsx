import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #888888;
`;

const SortOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right: 10px;
  accent-color: #6b46c1;
`;

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (field: "alphabet" | "birthday") => void;
  currentSort: "alphabet" | "birthday";
}

export const SortModal = ({
  isOpen,
  onClose,
  onSort,
  currentSort,
}: SortModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Сортировка</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <SortOption>
          <RadioInput
            type="radio"
            name="sort"
            checked={currentSort === "alphabet"}
            onChange={() => onSort("alphabet")}
          />
          По алфавиту
        </SortOption>
        <SortOption>
          <RadioInput
            type="radio"
            name="sort"
            checked={currentSort === "birthday"}
            onChange={() => onSort("birthday")}
          />
          По дню рождения
        </SortOption>
      </ModalContent>
    </ModalOverlay>
  );
};
