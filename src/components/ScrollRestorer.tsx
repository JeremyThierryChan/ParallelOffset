"use client";

import { useEffect } from "react";

export default function ScrollRestorer() {
  useEffect(() => {
    const raw = sessionStorage.getItem("__scroll");
    if (!raw) return;
    sessionStorage.removeItem("__scroll");
    const y = parseInt(raw, 10);
    if (!Number.isFinite(y) || y <= 0) return;
    // 用 requestAnimationFrame 确保在首帧绘制后恢复，避免被浏览器的默认滚动重置覆盖
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
  }, []);

  return null;
}
