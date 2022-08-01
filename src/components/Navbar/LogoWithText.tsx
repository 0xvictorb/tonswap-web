import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";
import TonLogo from "assets/images/shared/ton-logo.svg";
import { styled } from "@mui/system";
import { useTokensStore } from "store/tokens/hooks";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { OperationType } from "store/token-operations/reducer";
import { ROUTES } from "router/routes";
import useNavigateWithParams from "hooks/useNavigateWithParams";

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: "#6D6D6D",
  span: {
    color: "#50A7EA",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 15,
  },
}));

const LogoWithText = () => {
  const classes = useStyles();
  const { selectedToken } = useTokensStore();
  const { operationType } = useTokenOperationsStore();
  const navigate = useNavigateWithParams();

  const onClick = () => {
    if (!selectedToken) {
      return;
    }
    if (operationType === OperationType.SWAP) {
      navigate(ROUTES.swap.navigateToTokens);
      return;
    }
    if (operationType === OperationType.MANAGE_LIQUIDITY) {
      navigate(ROUTES.manageLiquidity.navigateToTokens);
      return;
    }
  };

  return (
    <Box
      style={{ cursor: selectedToken ? "pointer" : "" }}
      onClick={onClick}
      className={classes.logoBox}
    >
      <img className={classes.logo} src={TonLogo} alt="" />
      <StyledText>
        <strong>Ton</strong>Swap
        <span> Beta</span>
      </StyledText>
    </Box>
  );
};

export default LogoWithText;
