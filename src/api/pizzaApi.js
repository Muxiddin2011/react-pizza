const API_URL = "https://6ac62394bea0e72cf5c89da6.mockapi.io";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await response.text();

    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      throw new Error(
        data?.error || data?.message || `Server xatosi: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof TypeError) {
      throw new Error("Internet yoki server bilan aloqa yo'q.");
    }

    throw error;
  }
}


export function fetchPizzas({ category = null, sortBy = "", order = "" } = {}) {
  const params = new URLSearchParams();

  if (
    category !== null &&
    category !== undefined &&
    category !== "" &&
    category !== "all"
  ) {
    params.set("category", category);
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
  }

  if (order) {
    params.set("order", order);
  }

  const query = params.toString();

  return request(`/pizzas${query ? `?${query}` : ""}`);
}


export function fetchAllPizzas() {
  return request("/pizzas");
}


export function createPizza(pizza) {
  return request("/pizzas", {
    method: "POST",

    body: JSON.stringify({
      ...pizza,
    }),
  });
}


export function updatePizza(id, pizza) {
  return request(`/pizzas/${id}`, {
    method: "PUT",

    body: JSON.stringify({
      ...pizza,
    }),
  });
}


export function deletePizza(id) {
  return request(`/pizzas/${id}`, {
    method: "DELETE",
  });
}


export function fetchOrders() {
  return request("/orders");
}


export function createOrder(order) {
  return request("/orders", {
    method: "POST",

    body: JSON.stringify({
      ...order,

      delivered: false,
    }),
  });
}

export async function setOrderDelivered(id) {

  const order = await request(`/orders/${id}`);

  return request(`/orders/${id}`, {
    method: "PUT",

    body: JSON.stringify({
      ...order,

      delivered: true,
    }),
  });
}
