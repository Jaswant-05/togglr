"use client"
import { updateFeature } from "@/actions/feature"
import { useEffect } from "react";

export default function Page(){
  useEffect(() => {
    const testFunction = async() => {
      await updateFeature("2bcfc7a7-3b52-455f-b440-664a46a7fa02", "0b27e1e8-0670-4064-b7ae-dd48001f9765", true);
    }
    testFunction();
  }, []);

  return(
    <div>
      Hello
    </div>
  )
}