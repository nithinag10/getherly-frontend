"use server";

import { cookies } from "next/headers";

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(
      "https://gatherly-app-592179280005.us-central1.run.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      return { success: false, error: "Invalid credentials" };
    }

    const data = await response.json();

    cookies().set("token", data.token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    cookies().set("userId", data.user_id, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const response = await fetch(
      "https://gatherly-app-592179280005.us-central1.run.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    cookies().set("token", data.token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Registration failed. Please try again." };
  }
}
