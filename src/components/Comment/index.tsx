"use client";
import React from "react";

export default function Comment({ title }: { title?: string }) {
  return (
    <div className="w-full flex flex-col">
      <div>{title}</div>
    </div>
  );
}
