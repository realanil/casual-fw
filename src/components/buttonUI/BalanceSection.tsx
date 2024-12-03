import { usePixi } from "@/context/PixiContext";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

interface ButtonPanelProps {
  win: string | "0.00";
  isPortrait?: boolean;
}
const BalanceSection: React.FC<ButtonPanelProps> = ({ win, isPortrait }) => {
  const dataAPi: any = useAppSelector((state) => state.bet.data);
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    setBalance(Number(dataAPi?.accountBalance.balance).toFixed(2));
  }, [dataAPi]);
  const { device } = usePixi();
  return isPortrait ? (
    <div className="w-full sm:w-[350px] mb-0 text-center p-0.5">
      <div className="bg-gray-500 text-white rounded-s p-0 transform transition-transform duration-300">
        <span className="block1 text-left">Demo Balance: {balance}</span>
        <span className="block1 text-right ml-20">Win: {win}</span>
      </div>
    </div>
  ) : (
    <div
      className="bg-blue-00 text-white text-left rounded-lg transform transition-transform duration-300 mb-1"
      style={{
        width: "230px",
        // height: "50px",
      }}
    >
      <div className="ml-10">
        <span className="block">Demo Balance: {balance}</span>
        <span className="block">Win: {win}</span>
      </div>
    </div>
  );
};

export default BalanceSection;
