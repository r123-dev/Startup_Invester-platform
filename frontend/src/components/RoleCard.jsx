import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: 200,
  width: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  transformStyle: "preserve-3d",
  "&:hover": {
    transform: "perspective(600px) rotateX(10deg) rotateY(-10deg)",
    boxShadow: theme.shadows[8],
  },
}));

const RoleCard = ({ role, onClick }) => (
  <StyledCard onClick={onClick}>
    <CardContent>
      <Typography variant="h5">{role}</Typography>
    </CardContent>
  </StyledCard>
);

export default RoleCard;
