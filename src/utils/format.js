export function formatPrice(amount, currency = "Rs") {
  return `${currency} ${Number(amount).toLocaleString("en-PK")}`;
}

export function todayLabel() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function plural(n, one, many) {
  return n === 1 ? one : many;
}
