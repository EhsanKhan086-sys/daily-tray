import { MinusIcon, PlusIcon } from "./Icons.jsx";
import { MAX_PER_ITEM } from "../context/CartContext.jsx";

export default function QtyStepper({ value, onChange, min = 1, label = "Quantity" }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <MinusIcon />
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_PER_ITEM} aria-label="Increase quantity">
        <PlusIcon />
      </button>
    </div>
  );
}
