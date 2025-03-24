"use client"
import { getServerUrl } from "@/utils/server";
import axios from "axios";
import { useEffect, useState } from "react";

interface Item {
  item_id: string,
  q: number
}
export default function Home() {
  const [data, setData] = useState<Item | null>()

  const getItem = async () => {
    try {
      const SERVER_URL = await getServerUrl();
      const res = await axios.get(SERVER_URL + "/items/1?q=testing")
      setData(res.data)
    } catch (error) {
      console.error(error)
      setData(null)
    }
  }

  useEffect(() => {
    getItem()
  }, [])
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      API Response: {data ? JSON.stringify(data) : "No data"}
    </div>
  );
}
