export const getCurrentUser = async () => {
  try {
    const res = await fetch("/auth/current_user");
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
