import route from "../../router/index.js"

export default function logout() {
  localStorage.clear();
  route.push({ name: 'login' });
}