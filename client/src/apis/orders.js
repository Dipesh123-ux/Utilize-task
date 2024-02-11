const uri = "http://localhost:8080";
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${uri}/`, { method: "GET" });
    console.log(res);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const createOrder = async (data) => {
  try {
    const res = await fetch(`${uri}/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrder = async (id, data) => {
  try {
    console.log(id,data);
    const res = await fetch(`${uri}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await fetch(`${uri}/delete/${id}`, { method: "DELETE" });
    return res;
  } catch (err) {
    console.log(err);
  }
};
