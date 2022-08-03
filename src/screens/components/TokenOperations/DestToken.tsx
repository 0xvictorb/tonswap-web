import { Box } from "@mui/system";
import SwapCard from "components/SwapCard";
import { useEffect, useRef } from "react";
import { PoolInfo } from "services/api/addresses";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { InInput } from "store/token-operations/reducer";
import { fromNano, toNano } from "ton";
import { useDebouncedCallback } from "use-debounce";
import { calculateTokens } from "./util";

interface Props {
  token: PoolInfo;
  srcTokenName: string;
  getAmountFunc: any;
}

function DestToken({ token, srcTokenName, getAmountFunc }: Props) {
  const {
    destTokenAmount,
    totalBalances,
    destLoading,
    destAvailableAmountLoading,
    inInput
  } = useTokenOperationsStore();

  const {
    updateDestTokenAmount,
    updateSrcTokenAmount,
    updateSrcTokenLoading,
    onInputChange,
  } = useTokenOperationsActions();

  const balanceRef = useRef("");
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    let result = 0;
    const jetton = srcTokenName === "ton" ? token.tokenMinter : srcTokenName;
    try {
      result = await calculateTokens(
        jetton,
        srcTokenName !== "ton",
        null,
        toNano(balanceRef.current || "0"),
        getAmountFunc
      );

      if (!balanceRef.current) {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!balanceRef.current) {
        return;
      }
      updateSrcTokenLoading(false);
      if (result === 0) {
        return;
      } else {
        updateSrcTokenAmount(fromNano(result));
      }
    }
  }, 600);

  const onChange = (value: string) => {
    updateDestTokenAmount(value);
    onInputChange(InInput.DEST);
    balanceRef.current = value;
    if (!value) {
      updateSrcTokenLoading(false);
      updateSrcTokenAmount("");
    } else {
      updateSrcTokenLoading(true);
      debounce();
    }
  };

  useEffect(() => {
    if (destTokenAmount && inInput === InInput.DEST) {
       onChange(destTokenAmount);
    }
  }, []);


  return (
    <div style={{ marginBottom: 35 }}>
      <SwapCard
        isLoading={destLoading}
        onChange={onChange}
        inputAmount={destTokenAmount}
        token={token}
        balance={totalBalances.destBalance}
        balanceLoading={destAvailableAmountLoading}
      />
    </div>
  );
}

export default DestToken;
