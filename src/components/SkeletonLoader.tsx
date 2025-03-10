import styled from "styled-components";

const SkeletonCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

const SkeletonAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 15px;
  animation: pulse 1.5s infinite;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

const SkeletonText = styled.div`
  background-color: #e0e0e0;
  height: 16px;
  width: 150px;
  margin-bottom: 5px;
  animation: pulse 1.5s infinite;
`;

const SkeletonSubText = styled.div`
  background-color: #e0e0e0;
  height: 14px;
  width: 100px;
  animation: pulse 1.5s infinite;
`;

export const SkeletonLoader = ({ count }: { count: number }) => (
  <>
    {[...Array(count)].map((_, index) => (
      <SkeletonCard key={index}>
        <SkeletonAvatar />
        <div>
          <SkeletonText />
          <SkeletonSubText />
        </div>
      </SkeletonCard>
    ))}
  </>
);
