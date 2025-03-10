import styled from "styled-components";
import SelectedSvg from "../../assets/Selected.svg";
import UnSelectedSvg from "../../assets/UnSelected.svg";
import CloseSvg from "../../assets/Close.svg";

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
  border-radius: 12px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  color: #050510;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between; /* Распределяем заголовок и кнопку по краям */
  align-items: flex-end; /* Выравнивание по нижнему краю */
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #050510;
  margin: 0;
  padding: 0;
  flex-grow: 1; /* Занимает всё доступное пространство */
  text-align: center; /* Центрируем текст заголовка */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  margin-left: 8px; /* Небольшой отступ от заголовка */
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SortOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #050510;
`;

const RadioIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
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

  const handleSortChange = (field: "alphabet" | "birthday") => {
    onSort(field);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Сортировка</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon src={CloseSvg} alt="Close" />
          </CloseButton>
        </ModalHeader>
        <SortOption onClick={() => handleSortChange("alphabet")}>
          <RadioIcon
            src={currentSort === "alphabet" ? SelectedSvg : UnSelectedSvg}
            alt="Radio icon"
          />
          По алфавиту
        </SortOption>
        <SortOption onClick={() => handleSortChange("birthday")}>
          <RadioIcon
            src={currentSort === "birthday" ? SelectedSvg : UnSelectedSvg}
            alt="Radio icon"
          />
          По дню рождения
        </SortOption>
      </ModalContent>
    </ModalOverlay>
  );
};
