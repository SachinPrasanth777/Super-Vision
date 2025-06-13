import React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export const Frame = (): JSX.Element => {
  // Data for the bottom control bar
  const controlBarItems = [
    { type: "slider", label: "Creativity", value: "60%" },
    { type: "dimension", label: "W", value: "1920" },
    { type: "dimension", label: "H", value: "1024" },
    { type: "icon", icon: "/vector-3.svg" },
    { type: "action", label: "Upscale", icon: "/vector.svg" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1252px] h-[1280px]">
        <div className="relative h-[1280px] bg-[url(/sachin-1.png)] bg-cover bg-[50%_50%]">
          {/* Left panel with overlay */}
          <div className="absolute w-[919px] h-[1280px] top-0 left-0">
            {/* Divider line */}
            <img
              className="absolute w-[7px] h-[1280px] top-0 left-[634px]"
              alt="Divider"
              src="/vector-1.svg"
            />

            {/* Semi-transparent overlay */}
            <div className="absolute w-[637px] h-[1280px] top-0 left-0 bg-[#ffffff1a] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]" />

            {/* Bottom control bar */}
            <div className="w-[551px] top-[1206px] left-[368px] absolute h-[54px]">
              <Card className="relative w-[537px] h-[54px] bg-[#647a8b80] rounded-[15px] border-0">
                {/* Creativity slider */}
                <div className="absolute w-[130px] h-[37px] top-2 left-2.5 bg-[#d9d9d933] rounded-[15px_0px_0px_15px]">
                  <div className="absolute top-[7px] left-5 font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    Creativity
                  </div>
                </div>

                {/* Percentage value */}
                <div className="absolute w-[50px] h-[37px] top-2 left-[140px] bg-[#9c9c9c80] rounded-[0px_15px_15px_0px]">
                  <div className="absolute top-[7px] left-1 font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    60%
                  </div>
                </div>

                {/* Width value */}
                <div className="absolute w-[57px] h-[37px] top-2 left-[223px] bg-[#9c9c9c80] rounded-[10px]">
                  <div className="absolute top-[7px] left-1.5 font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    1920
                  </div>
                </div>

                {/* Icon button */}
                <div className="absolute w-[29px] h-[37px] top-2 left-[382px] bg-[#9c9c9c80] rounded-[10px]">
                  <img
                    className="absolute w-[18px] h-5 top-[9px] left-1.5"
                    alt="Vector"
                    src="/vector-3.svg"
                  />
                </div>

                {/* Width label */}
                <div className="absolute top-[15px] left-[197px] font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  W
                </div>

                {/* Height value */}
                <div className="absolute w-[57px] h-[37px] top-2 left-[315px] bg-[#9c9c9c80] rounded-[10px]">
                  <div className="absolute top-[7px] left-1.5 font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    1024
                  </div>
                </div>

                {/* Upscale button */}
                <Button
                  variant="outline"
                  className="absolute w-[106px] h-[37px] top-2 left-[421px] bg-[#ffffffe6] rounded-[10px] text-black hover:text-black hover:bg-[#ffffffcc] p-0"
                >
                  <img
                    className="absolute w-5 h-5 top-[9px] left-[5px]"
                    alt="Vector"
                    src="/vector.svg"
                  />
                  <span className="ml-7 font-normal text-xl">Upscale</span>
                </Button>

                {/* Height label */}
                <div className="absolute top-[15px] left-[290px] font-normal text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  H
                </div>
              </Card>
            </div>

            {/* Fluid.AI dropdown */}
            <div className="w-40 top-5 left-6 absolute h-[54px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative w-[158px] h-[54px] bg-[#647a8b80] rounded-[15px] border-0 hover:bg-[#647a8b99]">
                    <span className="font-normal text-white text-2xl">
                      Fluid.AI
                    </span>
                    <img
                      className="absolute w-4 h-[7px] top-[26px] left-[119px]"
                      alt="Icon"
                      src="/icon.svg"
                    />
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>

          {/* Help button */}
          <Button
            variant="outline"
            className="absolute w-[89px] h-[54px] top-5 left-[921px] bg-[#647a8b80] rounded-[15px] border-0 hover:bg-[#647a8b99]"
          >
            <span className="font-normal text-white text-2xl">Help</span>
          </Button>

          {/* DownloadIcon button */}
          <Button
            variant="outline"
            className="absolute w-[65px] h-[54px] top-5 left-[1171px] bg-[#647a8b80] rounded-[15px] border-0 hover:bg-[#647a8b99] p-0"
          >
            <img className="w-6 h-6" alt="Download" src="/vector-2.svg" />
          </Button>

          {/* Upscale button */}
          <Button
            variant="outline"
            className="absolute w-32 h-[54px] top-5 left-[1027px] bg-[#647a8b80] rounded-[15px] border-0 hover:bg-[#647a8b99]"
          >
            <span className="font-normal text-white text-2xl">upscale</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
