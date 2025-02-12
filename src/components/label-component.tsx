import "../styles/label-component.css";
import { IconArrow } from "./ui/buttons";

interface LabelComponentProps {
  title: string;
  value: string;
  onClickUp: () => void;
  onClickDown: () => void;
}

export default function LabelComponent(props: LabelComponentProps) {
  return (
    <>
      <div className="label-container">
        <span id={`${props.title}-label`}>{props.title} Length</span>

        <div className="label-btn-container">
          <button
            type="button"
            id={`${props.title}-increment`}
            onClick={props.onClickUp}
          >
            <IconArrow />
          </button>
          <span id={`${props.title}-length`}>{props.value}</span>
          <button
            type="button"
            id={`${props.title}-decrement`}
            onClick={props.onClickDown}
          >
            <IconArrow />
          </button>
        </div>
      </div>
    </>
  );
}
