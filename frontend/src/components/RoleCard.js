import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: 200,
  width: 200,
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  transformStyle: "preserve-3d",
  "&:hover": {
    transform: "perspective(600px) rotateX(10deg) rotateY(-10deg)",
    boxShadow: theme.shadows[8],
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const RoleCard = ({ role, onClick }) => (
  <StyledCard onClick={onClick}>
    <CardContent>
      <Typography variant="h5">{role}</Typography>
    </CardContent>
  </StyledCard>
);

export default RoleCard;
