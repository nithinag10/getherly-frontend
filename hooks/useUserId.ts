"use client";

import { useEffect, useState } from "react";

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`;
      console.log("All cookies:", document.cookie); // Debug log
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      }
      return null;
    };

    const cookieUserId = getCookieValue("userId");
    console.log("Cookie found:", document.cookie); // Debug log
    console.log("Parsed userId:", cookieUserId); // Debug log

    setUserId(cookieUserId);
  }, []);

  return userId;
}
