"use server";
import React from "react";
import Navbar from "./UI/Navbar";
import { getSession } from "../actions/session";
import { User } from "firebase/auth";
import { checkIfUserExists, createUser } from "@/lib/firebase/userActions";

const Index = async () => {
const session= await getSession();

  return <Navbar  session={session}/>;
};

export default Index;
