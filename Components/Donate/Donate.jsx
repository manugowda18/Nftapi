import React from "react";

import { FormSVG } from "../SVG/index";
import Style from "./Donate.module.css";

const Donate = ({ setDonate, setSupport, donateAmount, setLoading }) => {
  return (
    <div class={Style.card}>
      <div class={Style.card2}>
        <form class={Style.form}>
          <p id="heading" className={Style.heading}>
            Support The Creator
          </p>
          <div class={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input
              type="number"
              class={Style.input_field}
              placeholder="amount 0.025"
              autoComplete="0ff"
              min={0.025}
              onChange={(e) => setSupport(e.target.value)}
            />
          </div>
          <div class={Style.btn}>
            <button class={Style.button1} onClick={() => setDonate(false)}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button class={Style.button2}>Sign Up</button>
          </div>
          <button
            class={Style.button3}
            onClick={() => (setLoading(true), donateAmount(), setDonate(false))}
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;

//03:11:09
