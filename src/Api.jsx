export const API_URL =
  "https://64d93343e947d30a2609fe1c.mockapi.io/api/v1/medication";

export function POST_MEDICATION(body) {
  return {
    url: API_URL,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_MEDICATIONS() {
  return {
    url: API_URL,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function GET_MEDICATION(id) {
  return {
    url: `${API_URL}/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function UPDATE_MEDICATION(id, body) {
  return {
    url: `${API_URL}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_MEDICATION(id) {
  return {
    url: `${API_URL}/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
