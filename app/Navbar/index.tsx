"use server";
import React from "react";
import Navbar from "./UI/Navbar";
import { getSession } from "../actions/session";

const Index = async () => {
const session= await getSession();

  return <Navbar  session={session}/>;
};

export default Index;
