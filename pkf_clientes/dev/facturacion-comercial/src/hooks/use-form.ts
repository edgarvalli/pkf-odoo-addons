import { useEffect, useState, type ChangeEvent } from "react";

export function useForm<T>(initData?: T): FormHook<T> {
  const [data, setData] = useState<T>({} as T);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initData) {
      setData(initData);
    }
  }, []);

  return { data, setData, handleChange };
}

declare global {
  export type FormHook<T> = {
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
  };
}
