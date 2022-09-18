import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export function ReactionData(currentData, reaction, blogID) {
  const [data, setData] = useState(currentData);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          `http://localhost:8000/blogs/${blogID}/${reaction}`
        );

        if (!res.ok) {
          throw new Error("Server Error, Could Not Find Resources");
        }

        const resInfo = await res.json();
        if (resInfo) {
          setData(resInfo);
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    })();
  });

  return { data, error };
}

export async function updateDatabase(newData, blogID, reaction) {
  const patchConfigurations = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  };

  try {
    const res = await fetch(
      `http://localhost:8000/blogs/${blogID}/${reaction}`,
      patchConfigurations
    );

    if (!res.ok) {
      throw new Error("Server Error, Could Not Find Resources To Update...");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}