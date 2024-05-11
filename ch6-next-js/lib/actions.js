"use server";

import {cookies} from "next/headers"
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
import axios from "axios"

export async function shareMeal(prevState,formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };


  if(!meal.title || meal.title.trim() === ""){
    return { message: "Title cannot be empty!"}
  }  

  if(!meal.email || meal.email.includes("@") === false){
    return{ message : "Email cannot be empty! or Wrong email format!"}
  }  

  console.log(meal);



  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}


export async function signInAction(prevState, formData) {
  console.log("[signInAction]", formData);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
      email,
      password,
    });

    cookies().set('_token', res.data.data);

    console.log("response sukses?");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("error :", err);
    return {
      message: err.response.data.message || "An error occurred",
    };
  }
}
