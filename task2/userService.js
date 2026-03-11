async function getUserData(fetch, userId) {
  if (!userId) {
    throw new Error("User ID required");
  }
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}
module.exports = { getUserData };
