import React from "react";
import logofooter from "../assets/randomiq-logo-bottom.svg";

function Footer() {
  return (
    <footer className="bg-black px-16 py-7 flex justify-between items-center mt-24">
      <img src={logofooter} alt="" />
      <div className="flex gap-8">
        <a
          href="https://twitter.com/emrsyahh"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-white hover:text-[#FFC300]"
        >
          twitter
        </a>
        <a
          href="https://github.com/emrsyah"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-white hover:text-[#FFC300]"
        >
          github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
