import { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const CloseButton = styled(Button)`
  background: #dc3545;
  &:hover {
    background: #b02a37;
  }
`;

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (field: "firstName" | "birthday", direction: "asc" | "desc") => void;
}

export const SortModal = ({ isOpen, onClose, onSort }: SortModalProps) => {
  const [sortField, setSortField] = useState<"firstName" | "birthday">(
    "firstName",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  if (!isOpen) return null;

  const handleSort = () => {
    onSort(sortField, sortDirection);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Сортировка</h2>
        <div>
          <label>
            Поле для сортировки:
            <select
              value={sortField}
              onChange={(e) =>
                setSortField(e.target.value as "firstName" | "birthday")
              }
            >
              <option value="firstName">Имя</option>
              <option value="birthday">Дата рождения</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Направление:
            <select
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as "asc" | "desc")
              }
            >
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </label>
        </div>
        <Button onClick={handleSort}>Применить</Button>
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};
