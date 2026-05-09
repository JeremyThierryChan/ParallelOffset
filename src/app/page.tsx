"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace(
      (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/zh/"
    );
  }, []);
  return null;
}
