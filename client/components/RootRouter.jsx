import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RootRouter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return (
    <div></div>
  )
}